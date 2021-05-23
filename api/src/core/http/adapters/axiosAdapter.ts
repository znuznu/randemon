import axios from 'axios';
import { URL } from 'url';

import { Adapter as HttpAdapter, AdapterConfig, AdapterResponse } from '../adapter';

export default class AxiosAdapter implements HttpAdapter {
    async request(url: URL, config: AdapterConfig): Promise<AdapterResponse> {
        const response = await axios.request({
            url: url.toString(),
            ...config
        });

        const { status, headers } = response;

        try {
            return new AxiosAdapterResponse(status, headers, response.data);
        } catch (e) {
            throw new Error(
                `Couldn't create the AxiosAdapterReponse properly for ${url.toString()}`
            );
        }
    }
}

export class AxiosAdapterResponse implements AdapterResponse {
    constructor(
        public status: number,
        public headers: Record<string, string>,
        private jsonResponse: Record<any, any>
    ) {
        if (status !== 204 && jsonResponse) {
            this.jsonResponse = jsonResponse;
        } else {
            this.jsonResponse = {};
        }
    }

    json<T>(): T {
        return this.jsonResponse;
    }
}
