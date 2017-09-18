import * as _ from 'lodash';
import * as Promise from 'bluebird';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { Agent as HttpsAgent } from 'https';

import { HudAiClient, HudAiClientConfiguration } from './HudAiClient';
import { HudAiError } from './utils/HudAiError';

export interface RequestOptions {
    method: 'GET' | 'PUT' | 'POST' | 'DELETE';
    data?: object;
    params?: object;
    url: string;
}

export interface MakeRequestOptions {
    refreshTokens?: boolean
}

const clientVersion = require('../package.json').version;

export const defaultAxiosConfig = <AxiosRequestConfig> {
    headers: { 'User-Agent': `HUD.ai Javascript SDK v${clientVersion}`},
    // Use an agent with keep-alive enabled to avoid performing SSL handshake
    // per connection.
    httpsAgent: new HttpsAgent({ keepAlive: true, rejectUnauthorized: true }),
    // A redirect is usually information we want to handle, so don't
    // automatically follow
    maxRedirects: 0,
    // Encode requests as JSON. Encode the response as well if JSON is returned.
    responseType: 'json',
    // Standard 10s timeout
    timeout: 10000
};

export class RequestManager {
    private axios: AxiosInstance;
    private client: HudAiClient;

    // Instance Methods

    constructor(client: HudAiClient, config: HudAiClientConfiguration) {
        this.client = client;

        const axiosConfig = _.chain(config.request)
            .merge({ baseURL: client.baseApiUrl })
            .defaults(defaultAxiosConfig)
            .value();
        this.axios = axios.create(axiosConfig);
    }

    public makeRequest(requestOptions: RequestOptions, options: MakeRequestOptions = {}) {
        console.log('requestOptions', requestOptions)
        if (options.refreshTokens == undefined) options.refreshTokens = true;

        return Promise.resolve(options.refreshTokens ? this.client.refreshTokens() : undefined)
            .then(() => {
                const axiosOptions = this.buildAxiosOptions(requestOptions);
                const token = this.client.accessToken;
                if (token) _.set(axiosOptions, 'headers.Authorization', `Bearer ${token}`);
                return this.axios.request(axiosOptions);
            })
            .then(response => response.data)
            .catch(err => { throw new HudAiError(err.message, err.type); });
    }

    // Private Methods

    buildAxiosOptions(options: RequestOptions) {
        return {
            data: options.data,
            method: options.method,
            params: options.params,
            url: this.buildUrl(options.url, options.params),
        }
    }

    private buildUrl(url: string, params: Object = {}): string {
        return _.reduce(
            <ArrayLike<{}>>params,
            (url, value, key) => _.replace(url, `{${key}}`, <string>value),
            url
        );
    }
}
