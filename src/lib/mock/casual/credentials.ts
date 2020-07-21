/* eslint-disable camelcase */
import { arrayOf } from '@/lib/casual';
import { ModelType } from '@/lib/mock/casual/type';

const credentials = (casual) => {
    casual.define('credentials', () => ({
        credential_id: casual.word,
        name: casual.word,
        issue_type: casual.last_name,
        group: casual.make_id('group'),
        created_at: casual.timestamp,
        domain_id: casual.make_id('domain'),
        tags: casual.tags,
    }));
    return casual;
};

const credentialsGroup = (casual) => {
    casual.define('credentialsGroup', () => ({
        credentials: arrayOf(casual.integer(1, 20), casual._credentials),
        credential_group_id: casual.make_id('cred-grp'),
        name: casual.word,
        domain_id: casual.make_id('domain'),
        tags: casual.tags,
        created_at: casual.timestamp,
    }));
    return casual;
};

export interface CredentialsCasual {
    credentialsGroup?: any;
    _credentialsGroup?: any;
    credentials?: any;
    _credentials?: any;
}

const result: ModelType[] = [
    credentialsGroup, credentials,
];

export default result;
