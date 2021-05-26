import { URL } from 'url';
import { AdapterResponse } from './adapter';
import { createHttpService } from './mock';

describe('Mock HTTP service - unit', () => {
    describe('#createHttpService', () => {
        describe(`when the method is GET`, () => {
            let result: AdapterResponse;
            let httpService = createHttpService({
                get: {
                    status: 200,
                    headers: { authorization: 'Bearer such.cool.token' },
                    json: { user: 'BettyElms' }
                }
            });

            beforeEach(async () => {
                result = await httpService.get(new URL('http://some-url.com'));
            });

            it('should set the status', () => {
                expect(result.status).toEqual(200);
            });

            it('should set the headers', () => {
                expect(result.headers).toEqual({
                    authorization: 'Bearer such.cool.token'
                });
            });

            it('should return the json', () => {
                expect(result.json()).toEqual({ user: 'BettyElms' });
            });
        });

        describe(`when the method is POST`, () => {
            let result: AdapterResponse;
            let httpService = createHttpService({
                post: {
                    status: 200,
                    headers: { authorization: 'Bearer such.cool.token' },
                    json: { user: 'BettyElms' }
                }
            });

            beforeEach(async () => {
                result = await httpService.post(new URL('http://some-url.com'));
            });

            it('should set the status', () => {
                expect(result.status).toEqual(200);
            });

            it('should set the headers', () => {
                expect(result.headers).toEqual({
                    authorization: 'Bearer such.cool.token'
                });
            });

            it('should return the json', () => {
                expect(result.json()).toEqual({ user: 'BettyElms' });
            });
        });

        describe(`when the method is DELETE`, () => {
            let result: AdapterResponse;
            let httpService = createHttpService({
                delete: {
                    status: 204,
                    headers: { authorization: 'Bearer such.cool.token' },
                    json: {}
                }
            });

            beforeEach(async () => {
                result = await httpService.delete(new URL('http://some-url.com'));
            });

            it('should set the status', () => {
                expect(result.status).toEqual(204);
            });

            it('should set the headers', () => {
                expect(result.headers).toEqual({
                    authorization: 'Bearer such.cool.token'
                });
            });

            it('should return the json', () => {
                expect(result.json()).toEqual({});
            });
        });

        describe(`when the method is PUT`, () => {
            let result: AdapterResponse;
            let httpService = createHttpService({
                put: {
                    status: 200,
                    headers: { authorization: 'Bearer such.cool.token' },
                    json: { user: 'BettyElms' }
                }
            });

            beforeEach(async () => {
                result = await httpService.put(new URL('http://some-url.com'));
            });

            it('should set the status', () => {
                expect(result.status).toEqual(200);
            });

            it('should set the headers', () => {
                expect(result.headers).toEqual({
                    authorization: 'Bearer such.cool.token'
                });
            });

            it('should return the json', () => {
                expect(result.json()).toEqual({ user: 'BettyElms' });
            });
        });

        describe(`when the method is PATCH`, () => {
            let result: AdapterResponse;
            let httpService = createHttpService({
                patch: {
                    status: 200,
                    headers: { authorization: 'Bearer such.cool.token' },
                    json: { user: 'BettyElms' }
                }
            });

            beforeEach(async () => {
                result = await httpService.patch(new URL('http://some-url.com'));
            });

            it('should set the status', () => {
                expect(result.status).toEqual(200);
            });

            it('should set the headers', () => {
                expect(result.headers).toEqual({
                    authorization: 'Bearer such.cool.token'
                });
            });

            it('should return the json', () => {
                expect(result.json()).toEqual({ user: 'BettyElms' });
            });
        });
    });
});
