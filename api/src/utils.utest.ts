import { getRangeValues, UrlBuilder } from './utils';

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

    describe('#UrlBuilder', () => {
        describe('when no `with` are called', () => {
            it('should return an URL like the base one', () => {
                const builder = new UrlBuilder('/api');

                expect(builder.url).toEqual('/api');
            });
        });

        describe('when one `with` is called', () => {
            it('should return an URL with the content of `with`', () => {
                const builder = new UrlBuilder('/api').with('something');

                expect(builder.url).toEqual('/api/something');
            });
        });

        describe('when two `with` are called', () => {
            it('should return an URL with the content of the first and second `with`', () => {
                const builder = new UrlBuilder('/api').with('something').with('else');

                expect(builder.url).toEqual('/api/something/else');
            });
        });
    });
});
