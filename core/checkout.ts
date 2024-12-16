import ErcaspayBase from "./base";
import type {
  IBaseResponse,
  IInitiateCheckoutTransactionRequest,
  IInitiateCheckoutTransactionResponse,
  IVerifyCheckoutTransactionResponse,
} from "./interfaces";
import { checkoutSchema } from "../helpers/validations";

/**
 * Class for handling ErcasPay Checkout transactions.
 * This class provides methods for initiating and verifying transactions on the ErcasPay Checkout platform.
 * @extends ErcaspayBase
 */
export default class ErcaspayCheckout extends ErcaspayBase {
  /**
   * Base URL for checkout-related endpoints.
   * @private
   * @readonly
   */
  private readonly checkoutBaseUrl = "/payment";

  /**
   * Initiates a checkout transaction on the ErcasPay platform.
   * Validates the input data using a predefined schema before making the request.
   *
   * @param {IInitiateCheckoutTransactionRequest} data - The transaction details including amount, customer info, and payment options.
   * @returns {Promise<IInitiateCheckoutTransactionResponse>} - The response containing transaction references and the checkout URL.
   * @throws {Error} Throws an error if validation fails or the request is unsuccessful.
   *
   */
  public async initiateTransaction(data: IInitiateCheckoutTransactionRequest) {
    const values = await checkoutSchema.validateAsync(data);

    if (values.error) {
      throw new Error(values.error.message);
    }

    const response = await this.Axios.post<
      IBaseResponse<IInitiateCheckoutTransactionResponse>
    >(`${this.checkoutBaseUrl}/initiate`, data);
    return response.data;
  }

  /**
   * Verifies the status of a checkout transaction using its reference.
   *
   * @param {string} transactionReference - The unique reference of the transaction to verify.
   * @returns {Promise<IVerifyCheckoutTransactionResponse>} - The response containing transaction details.
   * @throws {Error} Throws an error if the transaction reference is not provided or the request fails.
   *
   * @example
   * const checkout = new ErcaspayCheckout(secretKey);
   * const response = await checkout.verifyTransaction("unique-transaction-ref");
   * console.log(response.status); // e.g., "success"
   */
  public async verifyTransaction(transactionReference: string) {
    if (!transactionReference) {
      throw new Error("Transaction reference is required");
    }

    const response = await this.Axios.get<
      IBaseResponse<IVerifyCheckoutTransactionResponse>
    >(`${this.checkoutBaseUrl}/transaction/verify/${transactionReference}`);

    return response.data;
  }
}
