/**
 * Represents the request structure for a card transaction.
 */
export interface ICardRequest {
  /**
   * An encripted version of a card details. Card details should be encripted with RSA algorithm
   * @type {string}
   */
  payload: string;

  /**
   * A unique reference for the transaction.
   * @type {string}
   */
  transactionReference: string;

  /**
   * Details about the device used for the transaction.
   */
  deviceDetails: {
    payerDeviceDto: {
      device: {
        /**
         * The browser used by the payer.
         * @type {string}
         */
        browser: string;

        /**
         * Browser details related to 3D Secure and device capabilities.
         */
        browserDetails: {
          /**
           * The 3D Secure challenge window size.
           * @type {string}
           */
          "3DSecureChallengeWindowSize": string;

          /**
           * Accept headers for the browser.
           * @type {string}
           */
          acceptHeaders: string;

          /**
           * The color depth of the device's display.
           * @type {number}
           */
          colorDepth: number;

          /**
           * Whether Java is enabled on the device.
           * @type {boolean}
           */
          javaEnabled: boolean;

          /**
           * The language setting of the device.
           * @type {string}
           */
          language: string;

          /**
           * The height of the device's screen in pixels.
           * @type {number}
           */
          screenHeight: number;

          /**
           * The width of the device's screen in pixels.
           * @type {number}
           */
          screenWidth: number;

          /**
           * The time zone offset in minutes.
           * @type {number}
           */
          timeZone: number;
        };

        /**
         * The IP address of the payer's device (optional).
         * @type {string | undefined}
         */
        ipAddress?: string;
      };
    };
  };
}

/**
 * Represents the response structure for a card transaction.
 */
export interface ICardResponse {
  /**
   * A code representing the status of the transaction.
   * @type {string}
   */
  code: string;

  /**
   * The status of the transaction (e.g., success, failed).
   * @type {string}
   */
  status: string;

  /**
   * A message from the gateway providing details about the transaction status.
   * @type {string}
   */
  gatewayMessage: string;

  /**
   * A support message providing additional assistance or instructions (optional).
   * @type {string | undefined}
   */
  supportMessage?: string;

  /**
   * A unique reference for the transaction.
   * @type {string}
   */
  transactionReference: string;

  /**
   * A unique payment reference.
   * @type {string}
   */
  paymentReference: string;

  /**
   * The amount of money involved in the transaction.
   * @type {number}
   */
  amount: number;

  /**
   * The URL to redirect to for completing the transaction.
   * @type {string}
   */
  redirectUrl: string;

  /**
   * A unique reference from the gateway (optional).
   * @type {string | undefined}
   */
  gatewayReference?: string;

  /**
   * The ECI flag for the transaction (optional).
   * @type {string | undefined}
   */
  eciFlag?: string;

  /**
   * The authentication code for the transaction (optional).
   * @type {string | undefined}
   */
  transactionAuth?: string;

  /**
   * The transaction ID (optional).
   * @type {string | undefined}
   */
  transactionId?: string;

  /**
   * A link to authenticate the transaction (optional).
   * @type {string | undefined}
   */
  transactionAuthLink?: string;
}

/**
 * Represents the request structure for submitting an OTP for a transaction.
 */
export interface ISubmitOTPRequest {
  /**
   * The one-time password (OTP) for transaction verification.
   * @type {string}
   */
  otp: string;

  /**
   * The gateway reference associated with the transaction.
   * @type {string}
   */
  gatewayReference: string;

  /**
   * A unique reference for the transaction.
   * @type {string}
   */
  transactionReference: string;
}

/**
 * Represents the response structure after submitting an OTP for a transaction.
 */
export interface ISubmitOTPResponse {
  /**
   * The status of the OTP submission.
   * @type {string}
   */
  status: string;

  /**
   * A message from the gateway providing additional details.
   * @type {string}
   */
  gatewayMessage: string;

  /**
   * A unique reference for the transaction.
   * @type {string}
   */
  transactionReference: string;

  /**
   * A unique payment reference.
   * @type {string}
   */
  paymentReference: string;

  /**
   * The amount involved in the transaction.
   * @type {number}
   */
  amount: number;

  /**
   * The URL to call back after submitting the OTP.
   * @type {string}
   */
  callbackUrl: string;
}

/**
 * Represents the request structure for resending an OTP.
 */
export interface IResendOTPRequest extends Omit<ISubmitOTPRequest, "otp"> {}

/**
 * Represents the response structure after resending an OTP.
 */
export interface IResendOTPResponse
  extends Omit<ISubmitOTPResponse, "amount" | "callbackUrl"> {}

/**
 * Represents the response structure for retrieving card details.
 */
export interface IGetCardDetailsResponse {
  /**
   * The amount involved in the transaction.
   * @type {number}
   */
  amount: number;

  /**
   * A unique reference for the transaction.
   * @type {string}
   */
  reference: string;

  /**
   * The currency in which the transaction is processed.
   * @type {string}
   */
  currency: string;
}

/**
 * Represents the response structure for verifying a card transaction.
 */
export interface IVerifyCardTransactionResponse {}
