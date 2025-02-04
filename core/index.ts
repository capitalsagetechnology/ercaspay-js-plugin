import ErcaspayCheckout from "./checkout";
import ErcaspayCard from "./card";
import ErcaspayBankTransfer from "./bank-transfer";
import ErcaspayUSSD from "./ussd";
import ErcaspayTransaction from "./transaction";

/**
 * The main class representing the Ercaspay client for handling various payment operations.
 * This class integrates multiple payment services, such as checkout, card payments, bank transfer, USSD, and transaction management.
 */
export default class ErcaspayClient {
  /**
   * An instance of the checkout payment service.
   * @type {ErcaspayCheckout}
   */
  public checkout: ErcaspayCheckout;

  /**
   * An instance of the card payment service.
   * @type {ErcaspayCard}
   */
  public card: ErcaspayCard;

  /**
   * An instance of the bank transfer payment service.
   * @type {ErcaspayBankTransfer}
   */
  public bankTransfer: ErcaspayBankTransfer;

  /**
   * An instance of the USSD payment service.
   * @type {ErcaspayUSSD}
   */
  public ussd: ErcaspayUSSD;

  /**
   * An instance of the transaction service.
   * @type {ErcaspayTransaction}
   */
  public transaction: ErcaspayTransaction;

  /**
   * Creates an instance of the Ercaspay client and initializes all services with the provided secret key and environment.
   *
   * @param {string} secretKey - The secret key for authenticating API requests.
   * @param {("production" | "development")?} environment - The environment to use for requests. Defaults to "development" if not specified.
   */
  constructor(secretKey: string, environment?: "production" | "development") {
    this.checkout = new ErcaspayCheckout(secretKey, environment);
    this.card = new ErcaspayCard(secretKey, environment);
    this.bankTransfer = new ErcaspayBankTransfer(secretKey, environment);
    this.ussd = new ErcaspayUSSD(secretKey, environment);
    this.transaction = new ErcaspayTransaction(secretKey, environment);
  }
}
