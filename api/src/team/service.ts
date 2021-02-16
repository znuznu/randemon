import { Team, TeamConfig, TeamConfigWithType } from '../models/randemon/team';
import { TypePokemonPAPI } from '../models/pokeapi/type.papi';
import { randInRange } from '../utils';
import {
    getIndexesOfMultipleGenerations,
    getMoveByName,
    getPokemonById,
    getPokemonNamedAPIResourceOfTypeByName
} from './getters';
import { Move } from '../models/randemon/move';

export async function generateTeam(parameters: TeamConfig): Promise<Team> {
    const { generations, numbersOfPokemon } = parameters;
    const team: Team = {
        pokemon: []
    };
    let indexes = getIndexesOfMultipleGenerations(generations);
    let pokemonLeft = numbersOfPokemon;

    while (pokemonLeft) {
        const index = indexes.splice(randInRange(0, indexes.length), 1)[0];
        let pokemon = await getPokemonById(Number(index));

        if (pokemon) {
            const moves = await getRandomMovesOfPokemon(4, pokemon.id);
            pokemon = { ...pokemon, moves };
            team.pokemon.push(pokemon);
            pokemonLeft--;
        }
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
        let pokemon = await getPokemonById(Number(index));

        if (pokemon) {
            const moves = await getRandomMovesOfPokemon(4, pokemon.id);
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

    if (pokemon) {
        let allMovesNames = pokemon.allMovesNames;

        allMovesNames = allMovesNames.filter(
            (moveName) => !excludedMovesNames?.includes(moveName)
        );

        let moves: Move[] = [];
        let movesLeft = numbersOfMoves;

        while (movesLeft) {
            const moveName = allMovesNames.splice(
                randInRange(0, allMovesNames.length),
                1
            )[0];

            const move = await getMoveByName(moveName);

            if (move) {
                moves.push(move);
                movesLeft--;
            }
        }

        return moves;
    }

    throw new Error('Cannot find random moves.');
}

export default {};
