import * as Promise from 'bluebird';

import {
    HudAiCreateAttributes,
    HudAiListAttributes,
    HudAiUpdateAttributes,
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';

export interface CompanyKeyTerm {
    id: string;
    companyId: string;
    term: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CompanyKeyTermGetAttributes {
    companyId: string;
    term: string;
}

export interface CompanyKeyTermListAttributes extends HudAiListAttributes {
    companyId: string;
    term?: string;
}

export interface CompanyKeyTermCreateAttributes extends HudAiCreateAttributes {
    companyId: string;
    term: string;
}

export interface CompanyKeyTermDestroyAttributes {
    companyId: string;
    term: string;
}

export class CompanyKeyTermResource extends Resource<
    CompanyKeyTerm,
    CompanyKeyTermListAttributes,
    CompanyKeyTermCreateAttributes,
    any
> {
    constructor(requestManager: RequestManager) {
        super('/companies/{companyId}/key-terms', requestManager);
    }

    public list(listArgs: CompanyKeyTermListAttributes): Promise<{ count: number, rows: CompanyKeyTerm[] }> {
        return this.makeRequest({
            method: 'GET',
            params: listArgs,
            url: `${this.basePath}`
        })
    }

    public create(createArgs: CompanyKeyTermCreateAttributes): Promise<CompanyKeyTerm> {
        return this.makeRequest({
            method: 'POST',
            data: createArgs,
            url: `${this.basePath}`
        })
    }

    public get(getArgs: CompanyKeyTermGetAttributes): Promise<CompanyKeyTerm> {
        return this.makeRequest({
            method: 'GET',
            params: getArgs,
            url: `${this.basePath}/{term}`
        })
    }

    public del(destroyArgs: CompanyKeyTermDestroyAttributes): Promise<void> {
        return this.destroy(destroyArgs)
    }

    public destroy(destroyArgs: CompanyKeyTermDestroyAttributes): Promise<void> {
        return this.makeRequest({
            method: 'DELETE',
            params: destroyArgs,
            url: `${this.basePath}/{term}`
        })
    }
}
