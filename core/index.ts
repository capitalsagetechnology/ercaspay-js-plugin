import ErcaspayCheckout from "./checkout";


export default class ErcaspayClient {
  public checkout: ErcaspayCheckout;

  constructor(
    secretKey: string,
    environment?: "production" | "development"
  ) {
    this.checkout = new ErcaspayCheckout(secretKey, environment);
  }
}