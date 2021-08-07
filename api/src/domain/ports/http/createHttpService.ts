import { URL } from 'url';
import { Body, Headers, HttpService } from './http.service';

import { HttpAdapter, AdapterConfig, AdapterResponse } from './httpAdapter';

export function createHttpService(adapter: HttpAdapter): HttpService {
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
