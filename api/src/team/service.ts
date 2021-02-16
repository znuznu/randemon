import { Team, TeamConfig, TeamConfigWithType } from '../models/randemon/team';
import { TypePokemonPAPI } from '../models/pokeapi/type.papi';
import { randInRange } from '../utils';
import {
    getIndexesOfMultipleGenerations,
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
        const pokemon = await getPokemonById(Number(index));

        if (pokemon) {
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
        const pokemon = await getPokemonById(Number(index));

        if (pokemon) {
            team.pokemon.push(pokemon);
            pokemonLeft--;
        }
    }

    return team;
}

export default {};
