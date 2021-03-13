import {
    getIndexesOfMultipleGenerations,
    getIndexesOfOneGeneration
} from '../../src/team/getters';
import {
    mutipleGenerationsFixtures,
    MultipleGenerationsFixture
} from './multipleGenerations.fixture';
import {
    SingleGenerationFixture,
    singleGenerationFixtures
} from './singleGeneration.fixture';

describe('in team', () => {
    singleGenerationFixtures.forEach(
        (fixture: SingleGenerationFixture) => {
            it('should return the expected pokemon indexes for a single generation', () => {
                const indexes = getIndexesOfOneGeneration(fixture.generation);
                expect(indexes).toStrictEqual(fixture.expectedIndexes);
            });
        }
    );

    mutipleGenerationsFixtures.forEach(
        (fixture: MultipleGenerationsFixture, index: number) => {
            describe(`fixture #${index}`, () => {
                it('should return the expected pokemon indexes for multiple generations', () => {
                    const indexes = getIndexesOfMultipleGenerations(fixture.generations);
                    expect(indexes).toStrictEqual(fixture.expectedIndexes);
                });
            });
        }
    );
});
