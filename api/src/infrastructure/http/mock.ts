import { URL } from 'url';
import { Body, Headers, HttpService } from '../../domain/ports/http/http.service';
import { AdapterConfig, AdapterResponse } from '../../domain/ports/http/httpAdapter';

export function createHttpService(overrides?: MockConfiguration): HttpService {
    async function request(
        _url: URL,
        _config: AdapterConfig,
        override?: MockOverride
    ): Promise<AdapterResponse> {
        return {
            status: override?.status ?? 200,
            headers: override?.headers ?? {},
            json: () => override?.json ?? {}
        };
    }

    return {
        get: (url: URL, config?: { headers?: Headers }) =>
            request(url, { ...config, method: 'GET' }, overrides?.get),
        post: (url: URL, config?: { headers?: Headers; body?: Body }) =>
            request(url, { ...config, method: 'POST' }, overrides?.post),
        delete: (url: URL, config?: { headers?: Headers }) =>
            request(url, { ...config, method: 'DELETE' }, overrides?.delete),
        put: (url: URL, config?: { headers?: Headers; body?: Body }) =>
            request(url, { ...config, method: 'PUT' }, overrides?.put),
        patch: (url: URL, config?: { headers?: Headers; body?: Body }) =>
            request(url, { ...config, method: 'PATCH' }, overrides?.patch)
    };
}

interface MockConfiguration {
    get?: MockOverride;
    post?: MockOverride;
    delete?: MockOverride;
    put?: MockOverride;
    patch?: MockOverride;
}

interface MockOverride {
    status?: number;
    headers?: Headers;
    json?: Record<any, any>;
}
