/**
 * Represents the request structure for initiating a checkout transaction.
 */
export interface IInitiateCheckoutTransactionRequest {
  /**
   * The amount for the transaction.
   * @type {number}
   */
  amount: number;

  /**
   * A unique reference for the payment.
   * @type {string}
   */
  paymentReference: string;

  /**
   * A comma-separated list of available payment methods.
   * @type {string}
   */
  paymentMethods: string;

  /**
   * The name of the customer initiating the payment.
   * @type {string}
   */
  customerName: string;

  /**
   * The email address of the customer.
   * @type {string}
   */
  customerEmail: string;

  /**
   * The phone number of the customer (optional).
   * @type {string | undefined}
   */
  customerPhoneNumber?: string;

  /**
   * The currency in which the transaction will be processed. It can be NGN, GBP, USD, EUR and CAD
   * @type {string}
   */
  currency: string;

  /**
   * Defines who bears the transaction fee ("customer" or "merchant").
   * @type {"customer" | "merchant" | undefined}
   */
  feeBearer?: "customer" | "merchant";

  /**
   * The URL to redirect to after the transaction.
   * @type {string | undefined}
   */
  redirectUrl?: string;

  /**
   * A description of the transaction.
   * @type {string | undefined}
   */
  description?: string;

  /**
   * Additional metadata related to the transaction (optional).
   * @type {Record<string, any> | undefined}
   */
  metadata?: Record<string, any>;
}

/**
 * Represents the response structure after initiating a checkout transaction.
 */
export interface IInitiateCheckoutTransactionResponse {
  /**
   * The unique payment reference.
   * @type {string}
   */
  paymentReference: string;

  /**
   * A unique transaction reference.
   * @type {string}
   */
  transactionReference: string;

  /**
   * The URL to complete the checkout process.
   * @type {string}
   */
  checkoutUrl: string;
}

/**
 * Represents the details of a customer.
 */
export interface ICustomer {
  /**
   * The name of the customer.
   * @type {string}
   */
  name: string;

  /**
   * The email address of the customer.
   * @type {string}
   */
  email: string;

  /**
   * The phone number of the customer (optional).
   * @type {string | undefined}
   */
  phone_number?: string;

  /**
   * A unique reference identifier for the customer.
   * @type {string}
   */
  reference: string;
}

/**
 * Represents the response structure for verifying a checkout transaction.
 */
export interface IVerifyCheckoutTransactionResponse {
  /**
   * The domain where the transaction was processed.
   * @type {string}
   */
  domain: string;

  /**
   * The status of the transaction (e.g., success, failed).
   * @type {string}
   */
  status: string;

  /**
   * The ERCs reference associated with the transaction.
   * @type {string}
   */
  ercs_reference: string;

  /**
   * The unique transaction reference.
   * @type {string}
   */
  tx_reference: string;

  /**
   * The amount for the transaction.
   * @type {number}
   */
  amount: number;

  /**
   * A description of the transaction.
   * @type {string}
   */
  description: string;

  /**
   * The timestamp when the payment was made.
   * @type {string}
   */
  paid_at: string;

  /**
   * The timestamp when the transaction was created.
   * @type {string}
   */
  created_at: string;

  /**
   * The payment channel used for the transaction.
   * @type {string}
   */
  channel: string;

  /**
   * The currency in which the transaction was processed.
   * @type {string}
   */
  currency: string;

  /**
   * Additional metadata related to the transaction (optional).
   * @type {Record<string, any> | undefined}
   */
  metadata?: Record<string, any>;

  /**
   * The fee charged for processing the transaction.
   * @type {number}
   */
  fee: number;

  /**
   * Specifies who bears the transaction fee ("customer" or "merchant").
   * @type {string}
   */
  fee_bearer: string;

  /**
   * The amount that was actually settled for the transaction.
   * @type {number}
   */
  settled_amount: number;

  /**
   * Information about the customer involved in the transaction.
   * @type {ICustomer}
   */
  customer: ICustomer;
}
