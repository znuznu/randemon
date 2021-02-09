import { RedisError } from 'redis';
import CacheService from '../cache/cacheService';
import { GENERATIONS } from '../constants';
import Generation from '../models/randemon/generation';
import Pokemon from '../models/randemon/pokemon';
import { Team, TeamConfig, TeamConfigWithType } from '../models/randemon/team';
import { randInRange, range } from '../utils';
import { fetchPokemonByNameOrId, fetchPokemonByTypes } from './fetch';

interface Range {
    from: number;
    to: number;
}

const cacheService = new CacheService();

const teamService = {
    getIndexesOfOneGeneration: (generation: Generation): number[] => {
        const genRangeIndexes = new Map<Generation, Range>([
            [Generation.I, { from: 1, to: 151 }],
            [Generation.II, { from: 152, to: 251 }],
            [Generation.III, { from: 252, to: 386 }],
            [Generation.IV, { from: 387, to: 493 }],
            [Generation.V, { from: 494, to: 649 }],
            [Generation.VI, { from: 650, to: 721 }],
            [Generation.VII, { from: 722, to: 809 }],
            [Generation.VIII, { from: 810, to: 898 }]
        ]);

        return range(
            genRangeIndexes.get(generation)!.from,
            genRangeIndexes.get(generation)!.to
        );
    },
    getIndexesOfMultipleGenerations: (generations: Generation[]): number[] => {
        generations = Array.from(new Set(generations));

        let indexes: number[] = [];

        generations.forEach((gen: Generation) => {
            indexes.push(...teamService.getIndexesOfOneGeneration(gen));
        });

        return indexes;
    },
    // TODO: getPokemonWithKey or something to avoid duplicates
    getPokemonById: async (index: number) => {
        return await cacheService
            .getAsync(`pokemon:id:${index}`)
            .then(async (pokemonFromCache: string | null) => {
                if (pokemonFromCache) {
                    return JSON.parse(pokemonFromCache);
                } else {
                    const pokemon = await fetchPokemonByNameOrId(String(index));

                    if (pokemon) {
                        cacheService.client.set(
                            `pokemon:id:${index}`,
                            JSON.stringify(pokemon)
                        );
                        cacheService.client.set(
                            `pokemon:name:${pokemon.name}`,
                            JSON.stringify(pokemon)
                        );
                        return pokemon;
                    }
                }
            })
            .catch((error: RedisError) => {
                console.error(error);
                return null;
            });
    },
    getPokemonByName: async (name: string) => {
        return await cacheService
            .getAsync(`pokemon:name:${name}`)
            .then(async (pokemonFromCache: string | null) => {
                if (pokemonFromCache) {
                    return JSON.parse(pokemonFromCache);
                } else {
                    const pokemon = await fetchPokemonByNameOrId(name);

                    if (pokemon) {
                        cacheService.client.set(
                            `pokemon:name:${name}`,
                            JSON.stringify(pokemon)
                        );
                        cacheService.client.set(
                            `pokemon:id:${pokemon.id}`,
                            JSON.stringify(pokemon)
                        );
                        return pokemon;
                    }

                    return null;
                }
            })
            .catch((error: RedisError) => {
                console.error(error);
                return null;
            });
    },
    generateTeam: async (parameters: TeamConfig) => {
        const { generations, numbersOfPokemon } = parameters;
        const team: Team = {
            pokemon: []
        };
        let indexes = teamService.getIndexesOfMultipleGenerations(generations);
        let pokemonLeft = numbersOfPokemon;

        while (pokemonLeft) {
            const index = indexes.splice(randInRange(0, indexes.length), 1)[0];
            const pokemon = await teamService.getPokemonById(Number(index));

            if (pokemon) {
                team.pokemon.push(pokemon);
                pokemonLeft--;
            }
        }

        return team;
    },
    generateTeamWithType: async (parameters: TeamConfigWithType) => {
        const { generations, numbersOfPokemon, type } = parameters;
        const team: Team = {
            pokemon: []
        };

        let indexes = teamService.getIndexesOfMultipleGenerations(generations);

        let pokemonWithType: Pokemon[] = await fetchPokemonByTypes(type!);
        pokemonWithType = pokemonWithType.filter((pokemon: Pokemon) =>
            indexes.includes(pokemon.id)
        );

        let pokemonLeft = numbersOfPokemon;

        while (pokemonLeft) {
            if (!pokemonWithType.length) {
                break;
            }

            const pokemon = pokemonWithType.splice(
                randInRange(0, pokemonWithType.length),
                1
            )[0];

            team.pokemon.push(pokemon);
            pokemonLeft--;
        }

        return team;
    }
};

export default teamService;
