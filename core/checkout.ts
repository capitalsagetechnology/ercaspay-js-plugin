import ErcaspayBase from "./base";
import type {
  IBaseResponse,
  IInitiateTransactionRequest,
  IInitiateTransactionResponse,
  IVerifyCardTransactionResponse,
} from "./interfaces";
import { checkoutSchema } from "../helpers/validations";

export default class ErcaspayCheckout extends ErcaspayBase {
  private readonly checkoutBaseUrl = "/payment";
  public async initiateTransaction(
    data: IInitiateTransactionRequest
  ): Promise<IBaseResponse<IInitiateTransactionResponse>> {
    const values = await checkoutSchema.validateAsync(data);

    if (values.error) {
      throw new Error(values.error.message);
    }

    const response = await this.Axios.post<
      IBaseResponse<IInitiateTransactionResponse>
    >(`${this.checkoutBaseUrl}/initiate`, data);
    return response.data;
  }

  public async verifyTransaction(
    transactionReference: string
  ): Promise<IBaseResponse<IVerifyCardTransactionResponse>> {
    if (!transactionReference) {
      throw new Error("Transaction reference is required");
    }

    const response = await this.Axios.get<
      IBaseResponse<IVerifyCardTransactionResponse>
    >(`${this.checkoutBaseUrl}/transaction/verify/${transactionReference}`);

    return response.data;
  }
}
