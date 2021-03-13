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

export async function generateTeam(parameters: TeamConfig): Promise<Team> {
    const { generations, numbersOfPokemon } = parameters;
    const team: Team = {
        pokemon: []
    };
    let indexes = getIndexesOfMultipleGenerations(generations);
    let pokemonLeft = numbersOfPokemon;

    while (pokemonLeft) {
        const index = indexes.splice(randInRange(0, indexes.length), 1)[0];
        let pokemon = await getPokemonById(index);
        const moves = await getRandomMoves(4, pokemon.allMovesNames);
        pokemon = { ...pokemon, moves };
        team.pokemon.push(pokemon);
        pokemonLeft--;
    }

    return team;
}

export async function generateTeamWithType(
    parameters: TeamConfigWithType
): Promise<Team> {
    const { generations, numbersOfPokemon, type } = parameters;

    const team: Team = {
        pokemon: []
    };
    let indexes = getIndexesOfMultipleGenerations(generations);
    let pokemonNamedAPIResources: TypePokemonPAPI[] = await getPokemonNamedAPIResourceOfTypeByName(
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

    while (pokemonLeft) {
        if (!pokemonIds.length) {
            break;
        }

        const index = pokemonIds.splice(randInRange(0, pokemonIds.length), 1)[0];
        let pokemon = await getPokemonById(index);

        if (pokemon) {
            const moves = await getRandomMoves(4, pokemon.allMovesNames);
            pokemon = { ...pokemon, moves };
            team.pokemon.push(pokemon);
            pokemonLeft--;
        }
    }

    return team;
}

export async function getRandomMovesOfPokemon(
    numbersOfMoves: number,
    pokemonId: number,
    excludedMovesNames?: string[]
): Promise<Move[]> {
    const pokemon = await getPokemonById(pokemonId);

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

    let moves: Move[] = [];
    let movesLeft = numbersOfMoves;

    while (movesNames.length && movesLeft) {
        const moveName = movesNames.splice(randInRange(0, movesNames.length), 1)[0];

        const move = await getMoveByName(moveName);
        if (move) {
            moves.push(move);
            movesLeft--;
        }
    }

    return moves;
}
