import ErcaspayBase from "./base";
import type {
  IBaseResponse,
  IGetTransactionDetailsResponse,
} from "./interfaces";

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
      IBaseResponse<IGetTransactionDetailsResponse>
    >(`${this.transactionBaseUrl}/verify/${transactionRef}`);

    return response.data;
  }
}
