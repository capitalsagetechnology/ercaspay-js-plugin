import ErcaspayBase from "./base";
import type { IBaseResponse, IIntitializeTransferResponse } from "./interfaces";

export default class ErcaspayBankTransfer extends ErcaspayBase {
  private readonly bankTransferBaseUrl = "/payment/bank-transfer";

  public async initializeTransfer(transactionReference: string) {
    if (!transactionReference) {
      throw new Error("Transaction reference is required");
    }

    const response = await this.Axios.post<
      IBaseResponse<IIntitializeTransferResponse>
    >(
      `${this.bankTransferBaseUrl}/request-bank-account/${transactionReference}`
    );

    return response.data;
  }
}
