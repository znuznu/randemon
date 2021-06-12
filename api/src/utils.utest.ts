import { filterValues, getRangeValues, PathBuilder } from './utils';

describe('Utils - unit', () => {
    describe('::getRangeValues', () => {
        describe('when the range is 0 to 10', () => {
            it('should return the expected result', () => {
                expect(getRangeValues(0, 10)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
            });
        });

        describe('when the range is 5 to 10', () => {
            it('should return the expected result', () => {
                expect(getRangeValues(5, 10)).toEqual([5, 6, 7, 8, 9, 10]);
            });
        });

        describe('when the provided `from` is greater than the provided `to`', () => {
            it('should return an empty array', () => {
                expect(getRangeValues(10, 5)).toEqual([]);
            });
        });

        describe('when the range is 0 to 0', () => {
            it('should return an array containing 0', () => {
                expect(getRangeValues(0, 0)).toEqual([0]);
            });
        });

        describe('when the range contains negative `from`', () => {
            it('should return an empty array', () => {
                expect(getRangeValues(-6, 26)).toEqual([]);
            });
        });

        describe('when the range contains negative `to`', () => {
            it('should return an empty array', () => {
                expect(getRangeValues(20, -6)).toEqual([]);
            });
        });

        describe('when the range contains negative `from` and `to`', () => {
            it('should return an empty array', () => {
                expect(getRangeValues(-6, -26)).toEqual([]);
            });
        });
    });

    describe('::PathBuilder', () => {
        describe('when no `with` are called', () => {
            it('should return an URL like the base one', () => {
                const builder = new PathBuilder('/api');

                expect(builder.path).toEqual('/api');
            });
        });

        describe('when one `with` is called', () => {
            it('should return an URL with the content of `with`', () => {
                const builder = new PathBuilder('/api').with('something');

                expect(builder.path).toEqual('/api/something');
            });
        });

        describe('when two `with` are called', () => {
            it('should return an URL with the content of the first and second `with`', () => {
                const builder = new PathBuilder('/api').with('something').with('else');

                expect(builder.path).toEqual('/api/something/else');
            });
        });
    });

    describe('::filterValues', () => {
        describe('when the values contains no values at all', () => {
            it('should return an empty array', () => {
                expect(filterValues([], [0, 5, 9, 87])).toHaveLength(0);
            });
        });

        describe('when the values contains no includes values at all', () => {
            it('should return an empty array', () => {
                expect(filterValues([1, 2, 3, 4, 5, 6], [])).toHaveLength(0);
            });
        });

        describe('when both arguments are not empty arrays', () => {
            it('should return an empty array', () => {
                expect(filterValues([1, 2, 3, 4, 5, 6], [3, 4, 9])).toEqual([3, 4]);
            });
        });
    });
});
