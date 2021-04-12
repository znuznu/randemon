import CacheService from '../cache/cacheService';
import { config } from '../config';
import { logger } from '../logger';
import { TypePokemonPAPI } from '../pokeapi/models/type.papi';
import { Move } from '../randemon/models/move';
import Pokemon from '../randemon/models/pokemon';
import { Team, TeamConfig } from '../randemon/models/team';
import Type from '../randemon/models/type';
import { randInRange } from '../utils';
import {
    getIndexesOfMultipleGenerations,
    getMoveByName,
    getPokemonById,
    getPokemonNamedAPIResourceOfTypeByName
} from './getters';

const cacheService = new CacheService(
    CacheService.createRedisClient({
        host: config.REDIS_URL,
        port: config.REDIS_PORT
    }),
    logger
);

export async function generateTeam(config: TeamConfig): Promise<Team> {
    const { generations, numbersOfPokemon, type } = config;
    let indexes = getIndexesOfMultipleGenerations(generations);
    let pokemonLeft = numbersOfPokemon;

    if (type) {
        indexes = await filterIdsByType(indexes, type);
    }

    return getTeam(indexes, pokemonLeft);
}

const pokemonIdRegexp = /\/(\d+)\/$/;
async function filterIdsByType(indexes: number[], type: Type): Promise<number[]> {
    const pokemonNamedAPIResources: TypePokemonPAPI[] = await getPokemonNamedAPIResourceOfTypeByName(
        cacheService,
        type!
    );

    let filteredIds: number[] = [];

    pokemonNamedAPIResources.forEach((pokemonNamedAPIResource) => {
        const match = pokemonIdRegexp.exec(pokemonNamedAPIResource.pokemon.url);

        if (match) {
            filteredIds.push(Number(match[1]));
        }
    });

    filteredIds = filteredIds.filter((id: number) => indexes.includes(id));

    return filteredIds;
}

async function getTeam(pokemonIds: number[], amount: number): Promise<Team> {
    const team: Team = {
        pokemon: []
    };

    while (amount) {
        if (!pokemonIds.length) {
            break;
        }

        const index = pokemonIds.splice(randInRange(0, pokemonIds.length), 1)[0];
        const pokemon = await getPokemon(index);
        team.pokemon.push(pokemon);
        amount--;
    }

    return team;
}

async function getPokemon(pokemonId: number): Promise<Pokemon> {
    const pokemon = await getPokemonById(cacheService, pokemonId);
    const moves = await getRandomMoves(4, pokemon.allMovesNames);

    return { ...pokemon, moves };
}

export async function getRandomMovesOfPokemon(
    numbersOfMoves: number,
    pokemonId: number,
    excludedMovesNames?: string[]
): Promise<Move[]> {
    const pokemon = await getPokemonById(cacheService, pokemonId);

    return getRandomMoves(numbersOfMoves, pokemon.allMovesNames, excludedMovesNames);
}

export async function getRandomMoves(
    numbersOfMoves: number,
    movesNames: string[],
    excludedMovesNames?: string[]
): Promise<Move[]> {
    // Gen 8 doesn't have any moves yet - 03/27/2021
    if (!movesNames.length) {
        return [];
    }

    movesNames = movesNames.filter((moveName) => !excludedMovesNames?.includes(moveName));

    const moves: Move[] = [];
    let movesLeft = numbersOfMoves;

    while (movesNames.length && movesLeft) {
        const moveName = movesNames.splice(randInRange(0, movesNames.length), 1)[0];

        const move = await getMoveByName(cacheService, moveName);
        if (move) {
            moves.push(move);
            movesLeft--;
        }
    }

    return moves;
}

export async function updateTeam(config: TeamConfig, team: Team): Promise<Team> {
    const { generations, numbersOfPokemon, type } = config;
    const { pokemon } = team;

    const lockedTeamIndexes: number[] = [];
    const lockedPokemon = pokemon.filter((pokemon, index) => {
        lockedTeamIndexes.push(index);
        return pokemon.isLocked;
    });

    let pokemonLeft = numbersOfPokemon - lockedPokemon.length;

    if (pokemonLeft < 0) {
        logger.info(
            `Number of locked Pokemon (${lockedPokemon.length}) is superior to numbersOfPokemon (${numbersOfPokemon})`
        );
        return { pokemon: lockedPokemon };
    }

    let indexes = getIndexesOfMultipleGenerations(generations);

    const lockedPokemonIds = lockedPokemon.map((pokemon) => pokemon.id);
    indexes = indexes.filter((id) => !lockedPokemonIds.includes(id));
    if (type) {
        indexes = await filterIdsByType(indexes, type);
    }

    if (!indexes.length) {
        return { pokemon: lockedPokemon };
    }

    const newTeam: Team = { pokemon: [] };

    for (const teamPokemon of pokemon) {
        if (!indexes.length) {
            break;
        }

        if (!teamPokemon.isLocked && indexes.length) {
            if (!pokemonLeft) {
                continue;
            }

            const newPokemonId = indexes.splice(randInRange(0, indexes.length), 1)[0];
            const newPokemon = await getPokemon(newPokemonId);
            newTeam.pokemon.push(newPokemon);
            pokemonLeft--;
        } else {
            newTeam.pokemon.push(teamPokemon);
        }
    }

    while (indexes.length && pokemonLeft) {
        const newPokemonId = indexes.splice(randInRange(0, indexes.length), 1)[0];
        const newPokemon = await getPokemon(newPokemonId);
        newTeam.pokemon.push(newPokemon);
        pokemonLeft--;
    }

    return newTeam;
}
