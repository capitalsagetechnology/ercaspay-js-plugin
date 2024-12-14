import ErcaspayBase from "./base";
import type {
  IBaseResponse,
  IGetTransactionDetailsResponse,
  IVerifyTransactionResponse,
  IGetTransactionStatusRequest,
  IGetTransactionStatusResponse,
} from "./interfaces";
import { getTransactionDetailsSchema } from "./../helpers/validations";

export default class ErcaspayTransaction extends ErcaspayBase {
  private readonly transactionBaseUrl = "/third-party/payment";

  public async getDetails(transactionReference: string) {
    if (!transactionReference) {
      throw new Error("Transaction reference is required");
    }

    const response = await this.Axios.get<
      IBaseResponse<IGetTransactionDetailsResponse>
    >(`${this.transactionBaseUrl}/details/${transactionReference}`);

    return response.data;
  }

  public async verify(transactionRef: string) {
    if (!transactionRef) {
      throw new Error("Transaction reference is required");
    }

    const response = await this.Axios.get<
      IBaseResponse<IVerifyTransactionResponse>
    >(`${this.transactionBaseUrl}/verify/${transactionRef}`);

    return response.data;
  }

  public async getStatus(data: IGetTransactionStatusRequest) {
    const values = await getTransactionDetailsSchema.validateAsync(data);

    if (values.error) {
      throw new Error(values.error.message);
    }

    const { paymentMethod, transactionReference, reference } = data;

    const modifiedDataToSend = {
      payment_method: paymentMethod,
      reference,
    };

    const response = await this.Axios.post<
      IBaseResponse<IGetTransactionStatusResponse>
    >(
      `${this.transactionBaseUrl}/status/${transactionReference}`,
      modifiedDataToSend
    );

    return response.data;
  }
}
