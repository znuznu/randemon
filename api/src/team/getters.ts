import CacheService from '../cache/cacheService';
import { config } from '../config';
import { logger } from '../logger';
import { range } from '../utils';
import { mapMoveFromAPI, mapPokemonFromAPI } from '../mappers/mappers';
import { fetchMove, fetchPokemonByNameOrId, fetchTypePokemonPAPIByType } from './fetch';
import Generation from '../randemon/models/generation';
import { TypePokemonPAPI } from '../pokeapi/models/type.papi';
import Type from '../randemon/models/type';
import Pokemon from '../randemon/models/pokemon';
import { Move } from '../randemon/models/move';

const cacheService = new CacheService(
    CacheService.createRedisClient({ host: config.REDIS_HOST, port: 6379 }),
    logger
);

interface Range {
    from: number;
    to: number;
}

export function getIndexesOfMultipleGenerations(generations: Generation[]): number[] {
    generations = Array.from(new Set(generations));

    const indexes: number[] = [];

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

export async function getPokemonNamedAPIResourceOfTypeByName(
    type: Type
): Promise<TypePokemonPAPI[]> {
    return await cacheService
        .get(`type:pokemon:${type}`)
        .then(async (pokemonNamedResourceAPIFromCache: string | null) => {
            if (pokemonNamedResourceAPIFromCache) {
                return JSON.parse(pokemonNamedResourceAPIFromCache);
            } else {
                const pokemonNamedAPIResource = await fetchTypePokemonPAPIByType(type);
                cacheService.set(
                    `type:pokemon:${type}`,
                    JSON.stringify(pokemonNamedAPIResource)
                );

                return pokemonNamedAPIResource;
            }
        });
}

export async function getPokemonById(index: number): Promise<Pokemon> {
    return await cacheService
        .get(`pokemon:id:${index}`)
        .then(async (pokemonFromCache: string | null) => {
            if (pokemonFromCache) {
                return JSON.parse(pokemonFromCache) as Pokemon;
            } else {
                const pokemonPAPI = await fetchPokemonByNameOrId(String(index));
                const pokemon = mapPokemonFromAPI(pokemonPAPI);

                cacheService.set(`pokemon:id:${index}`, JSON.stringify(pokemon));
                cacheService.set(`pokemon:name:${pokemon.name}`, JSON.stringify(pokemon));

                return pokemon;
            }
        });
}

export async function getPokemonByName(name: string): Promise<Pokemon> {
    return await cacheService
        .get(`pokemon:name:${name}`)
        .then(async (pokemonFromCache: string | null) => {
            if (pokemonFromCache) {
                return JSON.parse(pokemonFromCache) as Pokemon;
            } else {
                const pokemonPAPI = await fetchPokemonByNameOrId(name);

                const pokemon = mapPokemonFromAPI(pokemonPAPI);
                cacheService.set(`pokemon:name:${name}`, JSON.stringify(pokemon));
                cacheService.set(`pokemon:id:${pokemon.id}`, JSON.stringify(pokemon));

                return pokemon;
            }
        });
}

export async function getMoveByName(name: string): Promise<Move> {
    return await cacheService
        .get(`move:name:${name}`)
        .then(async (moveFromCache: string | null) => {
            if (moveFromCache) {
                return JSON.parse(moveFromCache) as Move;
            } else {
                const movePAPI = await fetchMove(name);

                const move = mapMoveFromAPI(movePAPI);
                cacheService.set(`move:name:${name}`, JSON.stringify(move));

                return move;
            }
        });
}
