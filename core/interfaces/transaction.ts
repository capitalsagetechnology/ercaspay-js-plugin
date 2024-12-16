import type {
  IInitiateCheckoutTransactionRequest,
  IVerifyCheckoutTransactionResponse,
} from "./checkout";

/**
 * Represents the white-label configuration for the transaction system.
 */
export interface IWhiteLabel {
  /**
   * The unique identifier for the white-label configuration.
   * @type {number}
   */
  id: number;

  /**
   * The URL of the logo to be displayed for the white-label brand.
   * @type {string}
   */
  logo_url: string;

  /**
   * The primary color associated with the white-label branding.
   * @type {string}
   */
  primary_color: string;

  /**
   * The accent color associated with the white-label branding.
   * @type {string}
   */
  accent_color: string;

  /**
   * The font family used in the white-label branding.
   * @type {string}
   */
  font_family: string;

  /**
   * The font color used in the white-label branding.
   * @type {string}
   */
  font_color: string;

  /**
   * Indicates whether the white-label configuration has been approved by an admin.
   * @type {string}
   */
  has_admin_approved: string;
}

/**
 * Represents the response structure for fetching transaction details.
 */
export interface IGetTransactionDetailsResponse {
  /**
   * The name of the customer involved in the transaction.
   * @type {string}
   */
  customerName: string;

  /**
   * The email address of the customer involved in the transaction.
   * @type {string}
   */
  customerEmail: string;

  /**
   * The amount of money involved in the transaction.
   * @type {number}
   */
  amount: number;

  /**
   * The business name associated with the transaction.
   * @type {string}
   */
  businessName: string;

  /**
   * The business logo associated with the transaction.
   * @type {string}
   */
  businessLogo: string;

  /**
   * The white-label configuration associated with the transaction.
   * @type {IWhiteLabel}
   */
  whiteLabel: IWhiteLabel;

  /**
   * The payment methods available for the transaction.
   * @type {string[]}
   */
  paymentMethods: string[];
}

/**
 * Represents the response structure for verifying a transaction.
 */
export interface IVerifyTransactionResponse
  extends IVerifyCheckoutTransactionResponse {}

/**
 * Represents the request structure for checking the status of a transaction.
 */
export interface IGetTransactionStatusRequest {
  /**
   * The payment method used in the transaction.
   * @type {string}
   */
  paymentMethod: string;

  /**
   * A unique reference for the transaction.
   * @type {string}
   */
  reference: string;

  /**
   * A unique reference for the transaction (external reference).
   * @type {string}
   */
  transactionReference: string;
}

/**
 * Represents the response structure for fetching the status of a transaction.
 */
export interface IGetTransactionStatusResponse {
  /**
   * A unique payment reference for the transaction.
   * @type {string}
   */
  paymentReference: string;

  /**
   * The amount of money involved in the transaction.
   * @type {number}
   */
  amount: number;

  /**
   * The status of the transaction (e.g., pending, completed).
   * @type {string}
   */
  status: string;

  /**
   * A description of the transaction status.
   * @type {string}
   */
  description: string;

  /**
   * The URL to call back after the transaction status is fetched.
   * @type {string}
   */
  callbackUrl: string;
}

/**
 * Represents the response structure for canceling a transaction.
 */
export interface ICancelTransactionResponse {
  /**
   * The URL to call back after canceling the transaction.
   * @type {string}
   */
  callback_url: string;
}

/**
 * Represents the request structure for initiating a transaction.
 */
export interface IInitiateTransactionRequest
  extends IInitiateCheckoutTransactionRequest {}

/**
 * Represents the response structure after initiating a transaction.
 */
export interface IInitiateTransactionResponse {
  /**
   * A unique payment reference for the transaction.
   * @type {string}
   */
  paymentReference: string;

  /**
   * A unique transaction reference for the initiated transaction.
   * @type {string}
   */
  transactionReference: string;

  /**
   * A URL to the checkout page for the transaction.
   * @type {string}
   */
  checkoutUrl: string;

  /**
   * The white-label configuration associated with the transaction.
   * @type {IWhiteLabel}
   */
  whiteLabel: IWhiteLabel;
}
