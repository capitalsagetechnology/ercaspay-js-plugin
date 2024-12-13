import ErcaspayBase from "./base";
import type { ICardRequest, IBaseResponse } from "./interfaces";
import { cardSchema } from "../helpers/validations/card-validation";

export default class ErcaspayCard extends ErcaspayBase {
  public async initiatePayment(
    data: ICardRequest
  ): Promise<IBaseResponse<any>> {
    const values = await cardSchema.validateAsync(data);

    if (values.error) {
      throw new Error(values.error.message);
    }

    const response = await this.Axios.post(
      "/third-party/payment/cards/initialize"
    );

    return response.data;
  }
}
