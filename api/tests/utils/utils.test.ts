import { range } from '../../src/utils';
import { UtilsFixture, utilsFixtures } from './utils.fixture';

describe('in utils', () => {
    utilsFixtures.forEach((fixture: UtilsFixture, index: number) => {
        describe(`fixture #${index}`, () => {
            it('should return the expected range indexes', () => {
                const indexes = range(fixture.range[0], fixture.range[1]);
                expect(indexes).toEqual(fixture.expectedIndexes);
            });
        });
    });
});
