import { UmbrellaFeeIndexEntityBase } from '../UmbrellaFeeIndexEntityBase';
import type { UmbrellaFeeIndexSDK } from '../UmbrellaFeeIndexSDK';
import type { Control } from '../types';
import type { Calculator, CalculatorCreateData } from '../UmbrellaFeeIndexTypes';
declare class CalculatorEntity extends UmbrellaFeeIndexEntityBase<Calculator> {
    constructor(client: UmbrellaFeeIndexSDK, entopts: any);
    make(this: CalculatorEntity): CalculatorEntity;
    create(this: any, reqdata?: CalculatorCreateData, ctrl?: Control): Promise<CalculatorEntity>;
}
export { CalculatorEntity };
