import * as Promise from 'bluebird';

import {
    HudAiCreateAttributes,
    HudAiListAttributes,
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';
import {Person} from './Person';

export interface Tweet {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    personId: string;
    twitterTweetId: number;
    text: string;
    person?: Person;
}

export interface TweetListAttributes extends HudAiListAttributes {
    personId?: string;
}

export interface TweetCreateAttributes extends HudAiCreateAttributes {
    personId: string;
    twitterTweetId: number;
    text: string;
}

export class TweetResource extends Resource<
    Tweet,
    TweetListAttributes,
    TweetCreateAttributes,
    any
    > {
    constructor(requestManager: RequestManager) {
        super('/people/tweets', requestManager);
    }

    public list(listArgs: TweetListAttributes): Promise<{ count: number, rows: Tweet[] }> {
        return this._list(listArgs);
    }

    public create(createArgs: TweetCreateAttributes): Promise<Tweet> {
        return this._create(createArgs);
    }

    public get(id: string | number): Promise<Tweet> {
        return this._get(id);
    }

    public del(id: string | number): Promise<void> {
        return this.destroy(id);
    }

    public destroy(id: string | number): Promise<void> {
        return this._destroy(id);
    }
}