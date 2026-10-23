import { UmbrellaFeeIndexEntityBase } from '../UmbrellaFeeIndexEntityBase';
import type { UmbrellaFeeIndexSDK } from '../UmbrellaFeeIndexSDK';
import type { Control } from '../types';
import type { Mcp, McpLoadMatch, McpCreateData } from '../UmbrellaFeeIndexTypes';
declare class McpEntity extends UmbrellaFeeIndexEntityBase<Mcp> {
    constructor(client: UmbrellaFeeIndexSDK, entopts: any);
    make(this: McpEntity): McpEntity;
    load(this: any, reqmatch?: McpLoadMatch, ctrl?: Control): Promise<McpEntity>;
    create(this: any, reqdata?: McpCreateData, ctrl?: Control): Promise<McpEntity>;
}
export { McpEntity };
