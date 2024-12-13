import ErcaspayCheckout from "./checkout";
import ErcaspayCard from "./card";


export default class ErcaspayClient {
  public checkout: ErcaspayCheckout;
  public card: ErcaspayCard;


  constructor(
    secretKey: string,
    environment?: "production" | "development"
  ) {
    this.checkout = new ErcaspayCheckout(secretKey, environment);
    this.card = new ErcaspayCard(secretKey, environment); 
  }
}