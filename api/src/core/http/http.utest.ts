import { URL } from 'url';
import { Adapter, AdapterConfig, AdapterResponse } from './adapter';
import { createHttpService, HttpService } from './http';

describe('HTTP service - unit', () => {
    describe('#createHttpService', () => {
        const response: AdapterResponse = {
            headers: { param1: 'Buh beh bah' },
            status: 200,
            json: (): Record<any, any> => ({
                param: 'wow such param'
            })
        };

        class AdapterClass implements Adapter {
            request(_url: URL, _config: AdapterConfig): Promise<AdapterResponse> {
                return Promise.resolve(response);
            }
        }

        let adapter: Adapter;
        let httpService: HttpService;

        beforeEach(() => {
            adapter = new AdapterClass();
            jest.spyOn(adapter, 'request');
            httpService = createHttpService(adapter);
        });

        describe('when the method is GET', () => {
            let result: AdapterResponse;

            beforeEach(async () => {
                result = await httpService.get(new URL('http://some-url.com'));
            });

            it('should call the request method', () => {
                expect(adapter.request).toHaveBeenCalledWith(
                    new URL('http://some-url.com'),
                    { method: 'GET' }
                );
            });

            it('should return the response', () => {
                expect(result).toEqual(response);
            });
        });

        describe('when the method is POST', () => {
            let result: AdapterResponse;

            beforeEach(async () => {
                result = await httpService.post(new URL('http://some-url.com'), {
                    headers: { authorization: 'Bearer such.cool.token' },
                    body: { user: 'BettyElms' }
                });
            });

            it('should call the request method', () => {
                expect(adapter.request).toHaveBeenCalledWith(
                    new URL('http://some-url.com'),
                    {
                        headers: { authorization: 'Bearer such.cool.token' },
                        body: { user: 'BettyElms' },
                        method: 'POST'
                    }
                );
            });

            it('should return the response', () => {
                expect(result).toEqual(response);
            });
        });

        describe('when the method is DELETE', () => {
            let result: AdapterResponse;

            beforeEach(async () => {
                result = await httpService.delete(new URL('http://some-url.com'), {
                    headers: { authorization: 'Bearer such.cool.token' }
                });
            });

            it('should call the request method', () => {
                expect(adapter.request).toHaveBeenCalledWith(
                    new URL('http://some-url.com'),
                    {
                        headers: { authorization: 'Bearer such.cool.token' },
                        method: 'DELETE'
                    }
                );
            });

            it('should return the response', () => {
                expect(result).toEqual(response);
            });
        });

        describe('when the method is PUT', () => {
            let result: AdapterResponse;

            beforeEach(async () => {
                result = await httpService.put(new URL('http://some-url.com'), {
                    headers: { authorization: 'Bearer such.cool.token' },
                    body: { user: 'BettyElms' }
                });
            });

            it('should call the request method', () => {
                expect(adapter.request).toHaveBeenCalledWith(
                    new URL('http://some-url.com'),
                    {
                        headers: { authorization: 'Bearer such.cool.token' },
                        body: { user: 'BettyElms' },
                        method: 'PUT'
                    }
                );
            });

            it('should return the response', () => {
                expect(result).toEqual(response);
            });
        });

        describe('when the method is PATCH', () => {
            let result: AdapterResponse;

            beforeEach(async () => {
                result = await httpService.patch(new URL('http://some-url.com'), {
                    headers: { authorization: 'Bearer such.cool.token' },
                    body: { user: 'BettyElms' }
                });
            });

            it('should call the request method', () => {
                expect(adapter.request).toHaveBeenCalledWith(
                    new URL('http://some-url.com'),
                    {
                        headers: { authorization: 'Bearer such.cool.token' },
                        body: { user: 'BettyElms' },
                        method: 'PATCH'
                    }
                );
            });

            it('should return the response', () => {
                expect(result).toEqual(response);
            });
        });
    });
});
