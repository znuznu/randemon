import { RedisError } from 'redis';
import CacheService from '../cache/cacheService';
import Generation from '../models/randemon/generation';
import Type from '../models/randemon/type';
import { range } from '../utils';
import { fetchPokemonByNameOrId, fetchTypePokemonPAPIByType } from './fetch';

const cacheService = new CacheService();

interface Range {
    from: number;
    to: number;
}

export function getIndexesOfMultipleGenerations(generations: Generation[]): number[] {
    generations = Array.from(new Set(generations));

    let indexes: number[] = [];

    generations.forEach((gen: Generation) => {
        indexes.push(...getIndexesOfOneGeneration(gen));
    });

    return indexes;
}

export function getIndexesOfOneGeneration(generation: Generation): number[] {
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
}

export async function getPokemonNamedAPIResourceOfTypeByName(type: Type) {
    return await cacheService
        .getAsync(`type:pokemon:${type}`)
        .then(async (pokemonNamedResourceAPIFromCache: string | null) => {
            if (pokemonNamedResourceAPIFromCache) {
                return JSON.parse(pokemonNamedResourceAPIFromCache);
            } else {
                const pokemonNamedAPIResource = await fetchTypePokemonPAPIByType(type);

                if (pokemonNamedAPIResource) {
                    cacheService.client.set(
                        `type:pokemon:${type}`,
                        JSON.stringify(pokemonNamedAPIResource)
                    );

                    return pokemonNamedAPIResource;
                }

                return null;
            }
        })
        .catch((error: RedisError) => {
            console.error(error);
            return null;
        });
}

export async function getPokemonById(index: number) {
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
}

export async function getPokemonByName(name: string) {
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
}
