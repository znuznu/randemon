import axios, { AxiosResponse } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { URL } from 'url';
import { AdapterResponse } from '../adapter';
import AxiosAdapter from './axiosAdapter';

describe('Axios HTTP service Adapter - unit', () => {
    describe('::request', () => {
        describe('when the method is GET', () => {
            beforeAll(() => {
                const mock = new MockAdapter(axios);
                mock.onGet(/200/).reply(
                    200,
                    { user: 'Betty Elms' },
                    { authorization: 'Bearer woaw.such.token', other: 'other' }
                );

                mock.onGet(/204/).reply(204, undefined, {
                    authorization: 'Bearer woaw.such.token',
                    other: 'other'
                });
            });

            describe('when the response has a 200 status code', () => {
                let result: AdapterResponse;

                beforeEach(async () => {
                    const adapter = new AxiosAdapter();

                    result = await adapter.request(new URL('https://some-200-url.com'), {
                        method: 'GET'
                    });
                });

                it('should set the status', () => {
                    expect(result.status).toEqual(200);
                });

                it('should set the headers', () => {
                    expect(result.headers).toEqual({
                        authorization: 'Bearer woaw.such.token',
                        other: 'other'
                    });
                });

                it('should set the JSON', () => {
                    expect(result.json()).toEqual({ user: 'Betty Elms' });
                });
            });

            describe('when the response has a 204 status code', () => {
                let result: AdapterResponse;

                beforeEach(async () => {
                    const adapter = new AxiosAdapter();

                    result = await adapter.request(new URL('https://some-204-url.com'), {
                        method: 'GET'
                    });
                });

                it('should set the status', () => {
                    expect(result.status).toEqual(204);
                });

                it('should set the headers', () => {
                    expect(result.headers).toEqual({
                        authorization: 'Bearer woaw.such.token',
                        other: 'other'
                    });
                });

                it('should have empty JSON', () => {
                    expect(result.json()).toEqual({});
                });
            });
        });
    });
});
