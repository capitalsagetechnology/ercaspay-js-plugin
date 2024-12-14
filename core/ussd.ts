import ErcaspayBase from "./base";
import type {IInitiateCodeRequest} from "./interfaces"

export default class ErcaspayUSSD extends ErcaspayBase {
    private readonly ussdBaseUrl = "/payment/ussd";
    

    public async initiateCode(data: IInitiateCodeRequest) {
        
    }
}