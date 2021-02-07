import { RedisError } from 'redis';
import CacheService from '../cache/cacheService';
import { GENERATIONS } from '../constants';
import Generation from '../models/randemon/generation';
import { Team, TeamParameters } from '../models/randemon/team';
import { randInRange, range } from '../utils';
import teamRequests from './teamRequests';

interface Range {
    from: number;
    to: number;
}

const REDIS_URL = process.env.REDIS_URL || 'localhost';
const cacheService = new CacheService(REDIS_URL);

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
    generateTeam: async (parameters: Partial<TeamParameters>) => {
        const generations = (parameters.generations as Generation[]) ?? GENERATIONS;
        let numbersOfPokemons = parameters.numbersOfPokemons || 6;

        const team: Team = {
            pokemons: []
        };

        let indexes = teamService.getIndexesOfMultipleGenerations(generations);

        while (numbersOfPokemons) {
            const index = indexes.splice(randInRange(0, indexes.length), 1);

            await cacheService
                .getAsync(`pokemon:id:${index}`)
                .then(async (pokemonFromCache: string | null) => {
                    if (pokemonFromCache) {
                        team.pokemons.push(JSON.parse(pokemonFromCache));
                    } else {
                        console.log('aie');
                        const pokemon = await teamRequests.getPokemonByNameOrId(
                            String(index)
                        );

                        if (pokemon) {
                            team.pokemons.push(pokemon);
                            cacheService.client.set(
                                `pokemon:id:${index}`,
                                JSON.stringify(pokemon)
                            );
                        }
                    }
                })
                .catch((error: RedisError) => {
                    console.error(error);
                });

            numbersOfPokemons--;
        }

        return team;
    }
};

export default teamService;
