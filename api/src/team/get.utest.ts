import { getIndexesOfMultipleGenerations } from './get';
import Generation from '../randemon/models/generation';
import {
    fakeRandemonGenerationIdsForOneThreeEight,
    fakeRandemonGenerationIdsForOneTwo,
    fakeRandemonGenerationIdsForTwo
} from '../../tests/fixtures/fakeRandemonGenerationIds';

describe('Get - unit', () => {
    describe('::getIndexesOfMultipleGenerations', () => {
        describe('when the array passed contains generation II', () => {
            it('should return the pokemon ids for generation II', () => {
                expect(getIndexesOfMultipleGenerations([Generation.II])).toEqual(
                    fakeRandemonGenerationIdsForTwo
                );
            });
        });

        describe('when the array passed contains generation I and II', () => {
            it('should return the pokemon ids for generation I and II', () => {
                expect(
                    getIndexesOfMultipleGenerations([Generation.I, Generation.II])
                ).toEqual(fakeRandemonGenerationIdsForOneTwo);
            });
        });

        describe('when the array passed contains generation I, III and VIII', () => {
            it('should return the pokemon ids for generation I, III and VIII', () => {
                expect(
                    getIndexesOfMultipleGenerations([
                        Generation.I,
                        Generation.III,
                        Generation.VIII
                    ])
                ).toEqual(fakeRandemonGenerationIdsForOneThreeEight);
            });
        });
    });
});
