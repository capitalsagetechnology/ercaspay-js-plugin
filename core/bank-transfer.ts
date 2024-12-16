import ErcaspayBase from "./base";
import type { IBaseResponse, IIntitializeTransferResponse } from "./interfaces";

/**
 * Handles bank transfer payment flows for the Ercaspay SDK.
 * @extends ErcaspayBase
 */
export default class ErcaspayBankTransfer extends ErcaspayBase {
  /**
   * The base URL for all bank transfer-related API endpoints.
   * @private
   * @readonly
   */
  private readonly bankTransferBaseUrl = "/payment/bank-transfer";

  /**
   * Initiates a card payment transaction.
   * Depending on the type of card, the response may include a link to a 3D authentication page
   * or a notification that an OTP has been sent to the registered phone number.
   *
   * @param {ICardRequest} data - The request payload containing encrypted card details and device information.
   * @returns {Promise<IBaseResponse<ICardResponse>>} The response object containing transaction details.
   * @throws {Error} If the request data validation fails.
   */
  public async initializeTransfer(transactionReference: string) {
    if (!transactionReference) {
      throw new Error("Transaction reference is required");
    }

    const response = await this.Axios.get<
      IBaseResponse<IIntitializeTransferResponse>
    >(
      `${this.bankTransferBaseUrl}/request-bank-account/${transactionReference}`
    );

    return response.data;
  }
}
