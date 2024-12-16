/**
 * Represents the request structure for initiating a code for a transaction.
 */
export interface IInitiateCodeRequest {
  /**
   * A unique reference for the transaction.
   * @type {string}
   */
  transactionReference: string;

  /**
   * The name of the bank associated with the transaction.
   * @type {string}
   */
  bankName: string;
}

/**
 * Represents the response structure for initiating a code for a transaction.
 */
export interface IInitiateCodeResponse {
  /**
   * The status of the initiation request (e.g., success, failure).
   * @type {string}
   */
  status: string;

  /**
   * The message provided by the gateway regarding the transaction initiation.
   * @type {string}
   */
  gatewayMessage: string;

  /**
   * The unique transaction reference associated with the initiation.
   * @type {string}
   */
  transactionReference: string;

  /**
   * A unique reference provided by the gateway for tracking the transaction.
   * @type {string}
   */
  gatewayReference: string;

  /**
   * The USSD code used for the transaction.
   * @type {string}
   */
  ussdCode: string;

  /**
   * The payment code used for the transaction.
   * @type {string}
   */
  paymentCode: string;

  /**
   * The amount of money involved in the transaction.
   * @type {number}
   */
  amount: number;

  /**
   * The time in seconds until the code expires.
   * @type {number}
   */
  expires_in: number;
}
