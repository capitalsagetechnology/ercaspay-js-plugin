import ErcaspayBase from "./base";
import type {
  IBaseResponse,
  IInitiateTransactionRequest,
  IInitiateTransactionResponse,
} from "./interfaces";
import { checkoutSchema } from "../helpers/validations/checkout-validation";

export default class ErcaspayCheckout extends ErcaspayBase {
  public async initiateTransaction(
    data: IInitiateTransactionRequest
  ): Promise<IBaseResponse<IInitiateTransactionResponse>> {
    const values = await checkoutSchema.validateAsync(data);

    if (values.error) {
      throw new Error(values.error.message);
    }

    const response = await this.Axios.post<
      IBaseResponse<IInitiateTransactionResponse>
    >("/payment/initiate", data);
    return response.data;
  }
}

