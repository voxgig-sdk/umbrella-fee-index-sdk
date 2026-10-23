import { UmbrellaFeeIndexEntityBase } from '../UmbrellaFeeIndexEntityBase';
import type { UmbrellaFeeIndexSDK } from '../UmbrellaFeeIndexSDK';
import type { Control } from '../types';
import type { Enquiry, EnquiryCreateData } from '../UmbrellaFeeIndexTypes';
declare class EnquiryEntity extends UmbrellaFeeIndexEntityBase<Enquiry> {
    constructor(client: UmbrellaFeeIndexSDK, entopts: any);
    make(this: EnquiryEntity): EnquiryEntity;
    create(this: any, reqdata?: EnquiryCreateData, ctrl?: Control): Promise<EnquiryEntity>;
}
export { EnquiryEntity };
