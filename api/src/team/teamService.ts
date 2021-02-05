import Generation from '../models/generation';
import { TeamParameters } from '../models/team';
import { range } from '../utils';

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
            (genRangeIndexes.get(generation) as Range).from,
            (genRangeIndexes.get(generation) as Range).to
        );
    },
    getIndexesOfMultipleGenerations: (generations: Generation[]): number[] => {
        let indexes: number[] = [];

        generations.forEach((gen: Generation) => {
            indexes.push(...teamService.getIndexesOfOneGeneration(gen));
        });

        return indexes;
    },
    generateTeam: async (parameters: TeamParameters) => {
        const { generations, numbersOfPokemons } = parameters;

        return { pokemons: [{ name: 'Pikachu' }] };
    }
};

export default teamService;
