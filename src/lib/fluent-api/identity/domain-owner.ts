/* eslint-disable camelcase */
import {
    CreateAction, GetAction, Resource,
    ResourceActions, SingleDeleteAction, UpdateAction,
} from '@/lib/fluent-api/toolset';
import {
    ListType, Tags, TimeStamp,
} from '@/lib/fluent-api/type';

const idField = 'domain_id';

interface IdParameter {
    [idField]: string;
}

interface CreateParameter extends Tags {
    name: string;
}
interface UpdateParameter extends Tags, IdParameter {
    owner_id: string;
    password?: string;
    name?: string;
    language?: string;
    timezone?: string;
    email?: string;
    mobile?: string;
}

class Create extends CreateAction<CreateParameter, any> {}
class Update extends UpdateAction<UpdateParameter, any> {
    setLanguage(lang: string): this {
        const api = this.clone();
        api.apiState.parameter.language = lang;
        return api;
    }

    setOnwerId(id: string): this {
        const api = this.clone();
        api.apiState.parameter.owner_id = id;
        return api;
    }
}
class Delete extends SingleDeleteAction<IdParameter, any> {
    idField = idField;
}
class Get extends GetAction<IdParameter, any> {
    idField = idField;
}
export default class DomainOwner extends Resource implements ResourceActions<'create'|'update'|'delete'|'get'> {
    protected name = 'domain-owner';

    create() { return new Create(this.api, this.baseUrl); }

    update() { return new Update(this.api, this.baseUrl); }

    delete() { return new Delete(this.api, this.baseUrl); }

    get() { return new Get(this.api, this.baseUrl); }
}
