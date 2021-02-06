import Generation from '../models/randemon/generation';
import Pokemon from '../models/randemon/pokemon';
import { Team, TeamParameters } from '../models/randemon/team';
import Type from '../models/randemon/type';
import { randInRange, range } from '../utils';
import teamRequests from './teamRequests';

interface Range {
    from: number;
    to: number;
}

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
        let indexes: number[] = [];

        generations.forEach((gen: Generation) => {
            indexes.push(...teamService.getIndexesOfOneGeneration(gen));
        });

        return indexes;
    },
    generateTeam: async (parameters: Partial<TeamParameters>) => {
        const generations = (parameters.generations as Generation[]) ?? [
            Generation.I,
            Generation.II,
            Generation.III,
            Generation.IV,
            Generation.V,
            Generation.VI,
            Generation.VII,
            Generation.VIII
        ];

        let numbersOfPokemons = parameters.numbersOfPokemons || 6;

        const team: Team = {
            pokemons: []
        };

        let indexes = teamService.getIndexesOfMultipleGenerations(generations);

        while (numbersOfPokemons) {
            const index = indexes.splice(randInRange(0, indexes.length), 1);

            const pokemon = await teamRequests.getPokemonByNameOrId(
                String(index)
            );

            team.pokemons.push(pokemon);

            numbersOfPokemons--;
        }

        return team;
    }
};

export default teamService;
