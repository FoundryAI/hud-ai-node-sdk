import * as Promise from 'bluebird';

import {
    HudAiCreateAttributes,
    HudAiListAttributes,
    HudAiUpdateAttributes,
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';
import { ArticleCompany } from '../entities';

export interface ArticleCompanyListAttributes extends HudAiListAttributes {
    articleId: string;
    companyId?: string;
}

export interface ArticleCompanyCreateAttributes extends HudAiCreateAttributes {
    articleId: string;
    companyId: string;
}

export interface ArticleCompanyDestroyAttributes {
    articleId: string;
    companyId: string;
}

export class ArticleCompanyResource extends Resource<
    ArticleCompany,
    ArticleCompanyListAttributes,
    ArticleCompanyCreateAttributes,
    any
> {
    constructor(requestManager: RequestManager) {
        super('/articles/companies', requestManager);
    }

    public list(listArgs: ArticleCompanyListAttributes): Promise<{ count: number, rows: ArticleCompany[] }> {
        return this.makeRequest({
            method: 'GET',
            params: listArgs,
            url: `${this.basePath}`
        })
    }

    public related(companyId: string): Promise<{ rows: { companyId: string }[] }> {
        return this.makeRequest({
            method: 'GET',
            params: { companyId },
            url: `${this.basePath}/{companyId}/related`
        })
    }

    public create(createArgs: ArticleCompanyCreateAttributes): Promise<ArticleCompany> {
        return this.makeRequest({
            method: 'POST',
            data: createArgs,
            url: `${this.basePath}`
        })
    }

    public del(destroyArgs: ArticleCompanyDestroyAttributes): Promise<void> {
        return this.destroy(destroyArgs)
    }

    public destroy(destroyArgs: ArticleCompanyDestroyAttributes): Promise<void> {
        return this.makeRequest({
            method: 'DELETE',
            params: destroyArgs,
            url: `${this.basePath}`
        })
    }
}
