import { URL } from 'url';
import { Body, Headers } from './http.service';

export interface HttpAdapter {
    request(url: URL, config: AdapterConfig): Promise<AdapterResponse>;
}

export interface AdapterConfig {
    headers?: Headers;
    body?: Body;
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
}

export interface AdapterResponse {
    status: number;
    headers: Headers;
    json: <T>() => T;
}
