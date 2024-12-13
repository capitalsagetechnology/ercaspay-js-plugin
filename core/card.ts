import ErcaspayBase from "./base";
import type { ICardRequest, IBaseResponse, ICardResponse } from "./interfaces";
import { cardSchema } from "../helpers/validations";

export default class ErcaspayCard extends ErcaspayBase {
  public async initiatePayment(
    data: ICardRequest
  ): Promise<IBaseResponse<ICardResponse>> {
    const values = await cardSchema.validateAsync(data);

    if (values.error) {
      throw new Error(values.error.message);
    }

    const response  = await this.Axios.post<IBaseResponse<ICardResponse>>(
      "/third-party/payment/cards/initialize"
    );

    return response.data;
  }
}
