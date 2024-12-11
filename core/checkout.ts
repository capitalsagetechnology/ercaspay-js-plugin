import ErcaspayBase from "./base";
import type { IBaseResponse } from "./base-response";

export default class ErcaspayCheckout extends ErcaspayBase {
   
  public async initiateTransaction(data: any) {
      try {
          const response = await this.Axios.post("/payment/initiate");
          
    } catch (error: any) {
        throw new Error(error);
    }
  }
}
