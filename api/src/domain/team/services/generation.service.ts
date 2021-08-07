import Generation from '../../models/generation';
import { getRangeValues } from '../../../utils';

interface Range {
    from: number;
    to: number;
}

export class GenerationService {
    static getIndexesOfMultipleGenerations(generations: Generation[]): number[] {
        generations = Array.from(new Set(generations));

        const indexes: number[] = [];

        generations.forEach((gen: Generation) => {
            indexes.push(...GenerationService.getIndexesOfOneGeneration(gen));
        });

        return indexes;
    }

    static getIndexesOfOneGeneration(generation: Generation): number[] {
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

        return getRangeValues(
            genRangeIndexes.get(generation)!.from,
            genRangeIndexes.get(generation)!.to
        );
    }
}
