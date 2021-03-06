import * as Promise from 'bluebird';

import {
    HudAiCreateAttributes,
    HudAiListAttributes,
    HudAiUpdateAttributes,
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';
import { Company } from '../entities';

export interface CompanyListAttributes extends HudAiListAttributes {
    id?: string;
    name?: string;
    ticker?: string;
    keyTerm?: string;
}

export interface CompanySearchAttributes extends HudAiListAttributes {
    id?: string;
    query?: string;
    homepageUrl?: string;
}

export interface CompanyCreateAttributes extends HudAiCreateAttributes {
    name: string;
    ticker?: string;
}

export interface CompanyUpdateAttributes extends HudAiUpdateAttributes {
    name?: string;
    ticker?: string;
}

export class CompanyResource extends Resource<
    Company,
    CompanyListAttributes,
    CompanyCreateAttributes,
    CompanyUpdateAttributes
> {
    constructor(requestManager: RequestManager) {
        super('/companies', requestManager);
    }

    public list(listArgs: CompanyListAttributes): Promise<{ count: number, rows: Company[] }> {
        return this._list(listArgs);
    }

    public search(searchArgs: CompanySearchAttributes): Promise<{}> {
        return this.makeRequest({
            method: 'GET',
            params: searchArgs,
            url: `${this.basePath}/search`
        })
    }

    public suggest(text: string): Promise<{}> {
        return this.makeRequest({
            method: 'GET',
            url: `${this.basePath}/search/suggest?query=${text}`
        })
    }

    public availableData(ids: string | string []): Promise<{}[]> {
        return this.makeRequest({
            method: 'GET',
            params: { id: ids },
            url: `${this.basePath}/available-data`
        })
    }

    public create(createArgs: CompanyCreateAttributes): Promise<Company> {
        return this._create(createArgs);
    }

    public get(id: string | number): Promise<Company> {
        return this._get(id);
    }

    public update(id: string | number, updateArgs: CompanyUpdateAttributes): Promise<Company> {
        return this._update(id, updateArgs);
    }

    public del(id: string | number): Promise<void> {
        return this.destroy(id);
    }

    public destroy(id: string | number): Promise<void> {
        return this._destroy(id);
    }
}
