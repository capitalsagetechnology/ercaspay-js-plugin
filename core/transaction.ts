import ErcaspayBase from "./base";
import type {
  IBaseResponse,
  IGetTransactionDetailsResponse,
  IVerifyTransactionResponse,
  IGetTransactionStatusRequest,
  IGetTransactionStatusResponse,
  ICancelTransactionResponse,
  IInitiateTransactionRequest,
  IInitiateTransactionResponse,
} from "./interfaces";
import {
  getTransactionDetailsSchema,
  initiateTransactionSchema,
} from "./../helpers/validations";

/**
 * A class representing transaction-related operations in the Ercaspay system.
 * This includes fetching transaction details, verifying transactions, checking status,
 * canceling transactions, and initiating new transactions.
 * @extends ErcaspayBase
 */
export default class ErcaspayTransaction extends ErcaspayBase {
  /**
   * Base URL for transaction-related endpoints.
   * @type {string}
   * @private
   * @readonly
   */
  private readonly transactionBaseUrl = "/payment";

  /**
   * Retrieves the details of a specific transaction using its reference.
   *
   * @param {string} transactionReference - The unique reference for the transaction.
   * @returns {Promise<IBaseResponse<IGetTransactionDetailsResponse>>} - The transaction details response.
   * @throws {Error} - Throws an error if the transactionReference is not provided.
   */
  public async getDetails(transactionReference: string) {
    if (!transactionReference) {
      throw new Error("Transaction reference is required");
    }

    const response = await this.Axios.get<
      IBaseResponse<IGetTransactionDetailsResponse>
    >(`${this.transactionBaseUrl}/details/${transactionReference}`);

    return response.data;
  }

  /**
   * Verifies the status of a specific transaction using its reference.
   *
   * @param {string} transactionRef - The unique reference for the transaction.
   * @returns {Promise<IBaseResponse<IVerifyTransactionResponse>>} - The verification response.
   * @throws {Error} - Throws an error if the transactionRef is not provided.
   */

  public async verify(transactionRef: string) {
    if (!transactionRef) {
      throw new Error("Transaction reference is required");
    }

    const response = await this.Axios.get<
      IBaseResponse<IVerifyTransactionResponse>
    >(`${this.transactionBaseUrl}/transaction/verify/${transactionRef}`);

    return response.data;
  }

  /**
   * Fetches the status of a transaction based on the provided data.
   *
   * @param {IGetTransactionStatusRequest} data - The request data containing payment method and transaction reference.
   * @returns {Promise<IBaseResponse<IGetTransactionStatusResponse>>} - The status of the transaction.
   * @throws {Error} - Throws an error if validation fails or if required fields are missing.
   */
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

  /**
   * Cancels a specific transaction using its reference.
   *
   * @param {string} transactionReference - The unique reference for the transaction to be canceled.
   * @returns {Promise<IBaseResponse<ICancelTransactionResponse>>} - The cancellation response.
   * @throws {Error} - Throws an error if the transactionReference is not provided.
   */
  public async cancel(transactionReference: string) {
    if (!transactionReference) {
      throw new Error("Transaction reference is required");
    }
    const response = await this.Axios.get<
      IBaseResponse<ICancelTransactionResponse>
    >(`${this.transactionBaseUrl}/cancel/${transactionReference}`);
    return response.data;
  }

  /**
   * Initiates a new transaction with the given data.
   *
   * @param {IInitiateTransactionRequest} data - The request data for initiating the transaction.
   * @returns {Promise<IBaseResponse<IInitiateTransactionResponse>>} - The response after initiating the transaction.
   * @throws {Error} - Throws an error if the input data is invalid or fails validation.
   */
  public async initiate(data: IInitiateTransactionRequest) {
    const values = await initiateTransactionSchema.validateAsync(data);

    if (values.error) {
      throw new Error(values.error.message);
    }

    const response = await this.Axios.post<
      IBaseResponse<IInitiateTransactionResponse>
    >(`${this.transactionBaseUrl}/initiate`, data);

    return response.data;
  }
}
