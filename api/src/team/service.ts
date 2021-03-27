import CacheService from '../cache/cacheService';
import { config } from '../config';
import { logger } from '../logger';
import { TypePokemonPAPI } from '../pokeapi/models/type.papi';
import { Move } from '../randemon/models/move';
import { Team, TeamConfig, TeamConfigWithType } from '../randemon/models/team';
import { randInRange } from '../utils';
import {
    getIndexesOfMultipleGenerations,
    getMoveByName,
    getPokemonById,
    getPokemonNamedAPIResourceOfTypeByName
} from './getters';

const cacheService = new CacheService(
    CacheService.createRedisClient({
        host: config.REDIS_HOST,
        port: config.REDIS_PORT
    }),
    logger
);

export async function generateTeam(parameters: TeamConfig): Promise<Team> {
    const { generations, numbersOfPokemon } = parameters;
    const indexes = getIndexesOfMultipleGenerations(generations);
    let pokemonLeft = numbersOfPokemon;

    return getTeam(indexes, pokemonLeft);
}

export async function generateTeamWithType(
    parameters: TeamConfigWithType
): Promise<Team> {
    const { generations, numbersOfPokemon, type } = parameters;

    const indexes = getIndexesOfMultipleGenerations(generations);
    const pokemonNamedAPIResources: TypePokemonPAPI[] = await getPokemonNamedAPIResourceOfTypeByName(
        cacheService,
        type!
    );

    const pokemonIdRegexp = /\/(\d+)\/$/;

    let pokemonIds: number[] = [];

    pokemonNamedAPIResources.forEach((pokemonNamedAPIResource) => {
        const match = pokemonIdRegexp.exec(pokemonNamedAPIResource.pokemon.url);

        if (match) {
            pokemonIds.push(Number(match[1]));
        }
    });

    pokemonIds = pokemonIds.filter((id: number) => indexes.includes(id));

    let pokemonLeft = numbersOfPokemon;

    return getTeam(pokemonIds, pokemonLeft);
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
        let pokemon = await getPokemonById(cacheService, index);
        const moves = await getRandomMoves(4, pokemon.allMovesNames);
        pokemon = { ...pokemon, moves };
        team.pokemon.push(pokemon);
        amount--;
    }

    return team;
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
    // Gen 8 doesn't have any moves yet
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
