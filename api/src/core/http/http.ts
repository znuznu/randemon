import { URL } from 'url';

import { Adapter, AdapterConfig, AdapterResponse } from './adapter';

export type Headers = Record<string, string>;
export type Body = Record<string, unknown>;

export interface HttpService {
    get: (url: URL, config?: { headers?: Headers }) => Promise<AdapterResponse>;
    post: (
        url: URL,
        config?: { headers?: Headers; body?: Body }
    ) => Promise<AdapterResponse>;
    delete: (url: URL, config?: { headers?: Headers }) => Promise<AdapterResponse>;
    put: (
        url: URL,
        config?: { headers?: Headers; body?: Body }
    ) => Promise<AdapterResponse>;
    patch: (
        url: URL,
        config?: { headers?: Headers; body?: Body }
    ) => Promise<AdapterResponse>;
}

export function createHttpService(adapter: Adapter): HttpService {
    async function request(url: URL, config: AdapterConfig): Promise<AdapterResponse> {
        try {
            return await adapter.request(url, config);
        } catch (e) {
            // TODO Logger here
            throw e;
        }
    }

    return {
        get: (url: URL, config?: { headers?: Headers }) =>
            request(url, { ...config, method: 'GET' }),
        post: (url: URL, config?: { headers?: Headers; body?: Body }) =>
            request(url, { ...config, method: 'POST' }),
        delete: (url: URL, config?: { headers?: Headers }) =>
            request(url, { ...config, method: 'DELETE' }),
        put: (url: URL, config?: { headers?: Headers; body?: Body }) =>
            request(url, { ...config, method: 'PUT' }),
        patch: (url: URL, config?: { headers?: Headers; body?: Body }) =>
            request(url, { ...config, method: 'PATCH' })
    };
}
