/* eslint-disable camelcase */
import {
    CreateAction,
    GetAction, GetDataAction, ListAction, MemberListAction,
    Resource,
    ResourceActions, SingleDeleteAction, SubMultiItemAction, UpdateAction,
} from '@/lib/fluent-api/toolset';
import {
    CollectionInfo, DefaultMetaData,
    ListType, ReferenceInfo, Tags, TimeStamp,
} from '@/lib/fluent-api/type';

const idField = 'cloud_service_id';
const idsField = 'cloud_services';

interface IdParameter {
    cloud_service_id: string;
}

export interface CloudServiceModel extends IdParameter, Tags {
    cloud_service_type: string;
    provider: string;
    cloud_service_group: string;
    data: any;
    metadata: DefaultMetaData;
    reference: ReferenceInfo;
    collection_info: CollectionInfo;
    region_info: any;
    project_id: string;
    domain_id: string;
    created_at: TimeStamp;
    updated_at: TimeStamp;
    console_force_data?: any;
}

export type CloudServiceListResp = ListType<CloudServiceModel>

interface CreateParameter extends Tags{
    name: string;
}
interface UpdateParameter extends Tags, IdParameter{
    name: string;
}

class Create extends CreateAction<CreateParameter, any> {}
class Update extends UpdateAction<UpdateParameter, any> {}
class Delete extends SingleDeleteAction<IdParameter, any> {
    idField = idField;
}
class Get extends GetAction<IdParameter, CloudServiceModel> {
    idField = idField;
}
class GetData extends GetDataAction<any, ListType<any>> {
    idField = idField
}

class List extends ListAction<any, CloudServiceListResp> {}

class MemberList extends MemberListAction<any, any> {
    protected idsField = idsField;
}

class ChangeProject extends SubMultiItemAction<any, any> {
    isMutationApi = true

    path = 'change-project'

    idField = 'project_id'

    protected subIdsField = idsField;

    setReleaseProject() {
        this.apiState.parameter.release_project = true;
        return this.clone();
    }
}


export default class CloudService extends Resource implements ResourceActions<'create'|'update'|'delete'|'get'|'list'|'getData'|'memberList'|'changeProject'> {
    protected name = 'cloud-service';

    create() { return new Create(this.api, this.baseUrl); }

    update() { return new Update(this.api, this.baseUrl); }

    delete() { return new Delete(this.api, this.baseUrl); }

    get() { return new Get(this.api, this.baseUrl); }

    getData(): GetData { return new GetData(this.api, this.baseUrl); }

    list() { return new List(this.api, this.baseUrl); }

    memberList(): MemberList { return new MemberList(this.api, this.baseUrl); }

    changeProject() { return new ChangeProject(this.api, this.baseUrl); }
}
