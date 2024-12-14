import ErcaspayCheckout from "./checkout";
import ErcaspayCard from "./card";
import ErcaspayBankTransfer from "./bank-transfer";

export default class ErcaspayClient {
  public checkout: ErcaspayCheckout;
  public card: ErcaspayCard;
  public bankTransfer: ErcaspayBankTransfer;

  constructor(secretKey: string, environment?: "production" | "development") {
    this.checkout = new ErcaspayCheckout(secretKey, environment);
    this.card = new ErcaspayCard(secretKey, environment);
    this.bankTransfer = new ErcaspayBankTransfer(secretKey, environment);
  }
}
