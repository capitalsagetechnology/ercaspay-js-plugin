import ErcaspayBase from "./base";
import type {
  ICardRequest,
  IBaseResponse,
  ICardResponse,
  ISubmitOTPRequest,
  ISubmitOTPResponse,
  IResendOTPRequest,
  IResendOTPResponse,
  IGetCardDetailsResponse,
  IVerifyCardTransactionResponse,
} from "./interfaces";
import {
  cardSchema,
  submitOTPSchema,
  resendOTPSchema,
} from "../helpers/validations";

/**
 * Class for handing card-related payment flows for the Ercaspay system.
 * @extends ErcaspayBase
 */
export default class ErcaspayCard extends ErcaspayBase {
  /**
   * Base URL for card-related endpoints.
   * @private
   * @readonly
   */
  private readonly cardBaseUrl = "/payment/cards";

  /**
   * Initiates a card payment transaction.
   * Depending on the type of card, the response may include a link to a 3D authentication page
   * or a notification that an OTP has been sent to the registered phone number.
   *
   * @param {ICardRequest} data - The request payload containing encrypted card details and device information.
   * @returns {Promise<IBaseResponse<ICardResponse>>} The response object containing transaction details.
   * @throws {Error} If the request data validation fails.
   */
  public async initiatePayment(
    data: ICardRequest
  ): Promise<IBaseResponse<ICardResponse>> {
    const values = await cardSchema.validateAsync(data);

    if (values.error) {
      throw new Error(values.error.message);
    }

    const response = await this.Axios.post<IBaseResponse<ICardResponse>>(
      `${this.cardBaseUrl}/initialize`
    );

    return response.data;
  }

  /**
   * Submits an OTP for card validation.
   * If the OTP is valid, the transaction is processed by the customer's payment institution.
   *
   * @param {ISubmitOTPRequest} data - The request payload containing the OTP, transaction reference, and gateway reference.
   * @returns {Promise<IBaseResponse<ISubmitOTPResponse>>} The response object with transaction confirmation details.
   * @throws {Error} If the request data validation fails.
   */
  public async submitOTP(data: ISubmitOTPRequest) {
    const values = await submitOTPSchema.validateAsync(data);

    if (values.error) {
      throw new Error(values.error.message);
    }

    const { transactionReference, ...dataExcludingTransactionReference } = data;

    const response = await this.Axios.post<IBaseResponse<ISubmitOTPResponse>>(
      `${this.cardBaseUrl}/otp/submit/${transactionReference}`,
      dataExcludingTransactionReference
    );

    return response.data;
  }

  /**
   * Resends an OTP for card validation.
   * Useful if the user did not receive the OTP or it expired.
   *
   * @param {IResendOTPRequest} data - The request payload containing the transaction and gateway references.
   * @returns {Promise<IBaseResponse<IResendOTPResponse>>} The response object indicating whether the OTP was resent successfully.
   * @throws {Error} If the request data validation fails.
   */
  public async resendOTP(data: IResendOTPRequest) {
    const values = await resendOTPSchema.validateAsync(data);

    if (values.error) {
      throw new Error(values.error.message);
    }

    const { transactionReference, ...dataExcludingTransactionReference } = data;

    const response = await this.Axios.post<IBaseResponse<IResendOTPResponse>>(
      `${this.cardBaseUrl}/otp/resend/${transactionReference}`,
      dataExcludingTransactionReference
    );

    return response.data;
  }

  /**
   * Retrieves the details of a card transaction.
   * Useful for transaction monitoring, reconciliation, and auditing.
   *
   * @param {string} transactionReference - The unique reference for the transaction.
   * @returns {Promise<IBaseResponse<IGetCardDetailsResponse>>} The response object containing transaction details.
   * @throws {Error} If the transaction reference is missing or invalid.
   */
  public async getDetails(transactionReference: string) {
    if (!transactionReference) {
      throw new Error("Transaction reference is required");
    }
    const response = await this.Axios.get<
      IBaseResponse<IGetCardDetailsResponse>
    >(`${this.cardBaseUrl}/details/${transactionReference}`);

    return response.data;
  }

  /**
   * Verifies the validity of a card transaction.
   * Confirms whether the transaction is authentic and can proceed further.
   *
   * @param {string} reference - The unique reference for the transaction to be verified.
   * @returns {Promise<IBaseResponse<unknown>>} The response indicating the verification result.
   * @throws {Error} If the reference is missing or invalid.
   */
  public async verifyTransaction(reference: string) {
    if (!reference) {
      throw new Error("Reference is required");
    }
    const response = await this.Axios.get<IBaseResponse<unknown>>(
      `${this.cardBaseUrl}/verify/${reference}`
    );

    return response.data;
  }
}
