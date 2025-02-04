/**
 * Represents the response structure after initializing a transfer.
 */
export interface IIntitializeTransferResponse {
  /**
   * The status of the transfer (e.g., success, failed).
   * @type {string}
   */
  status: string;

  /**
   * A message from the gateway providing additional details about the transfer status.
   * @type {string}
   */
  gatewayMessage: string;

  /**
   * A unique reference for the transaction.
   * @type {string}
   */
  transactionReference: string;

  /**
   * The amount of money to be transferred.
   * @type {number}
   */
  amount: number;

  /**
   * The account number to which the transfer will be made.
   * @type {string}
   */
  accountNumber: string;

  /**
   * The email address associated with the account receiving the transfer.
   * @type {string}
   */
  accountEmail: string;

  /**
   * The name of the account holder receiving the transfer.
   * @type {string}
   */
  accountName: string;

  /**
   * A unique reference for the account involved in the transfer.
   * @type {string}
   */
  accountReference: string;

  /**
   * The name of the bank handling the transfer.
   * @type {string}
   */
  bankName: string;

  /**
   * The time in seconds until the transfer expires.
   * @type {number}
   */
  expires_in: number;
}
