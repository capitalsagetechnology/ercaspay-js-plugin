import ErcaspayBase from "./base";
import type { ICardRequest, IBaseResponse } from "./interfaces";

export default class ErcaspayCard extends ErcaspayBase {
  public async initiatePayment(
    data: ICardRequest
  ): Promise<IBaseResponse<any>> {
    const response = await this.Axios.post(
      "/third-party/payment/cards/initialize"
    );

    return response.data;
  }
}
