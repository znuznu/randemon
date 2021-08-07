import { URL } from "url";
import { AdapterResponse } from "./httpAdapter";

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