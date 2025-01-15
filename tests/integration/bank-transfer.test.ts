import { expect, test, describe, it, beforeEach } from "bun:test";
import { ErcaspayClient } from "./../../";

describe.skip("Bank Transfer Module Test 🧪", () => {
  const client = new ErcaspayClient(
    process.env.SECRET_KEY as string,
    "development"
  );

  describe.skip("Initiate Bank Transfer", async () => {
    it("Should return a 200 status code, with appropriate typed response", async () => {
      const initiateTransactionRequest =
        await client.checkout.initiateTransaction({
          amount: 10000,
          paymentReference: "R5md7gd9b4s3h2j5d67g",
          paymentMethods: "card,bank-transfer,ussd,qrcode",
          customerName: "Adedoyin Emmanuel",
          customerEmail: "hi@adedoyinemmanuel.dev",
          customerPhoneNumber: "09061626364",
          redirectUrl: "https://github.com/adedoyin-emmanuel",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          currency: "NGN",
          feeBearer: "customer",
          metadata: {
            firstname: "Temi",
            lastname: "Girl",
            email: "temigirl@mail.com",
          },
        });

      const transactionRef =
        initiateTransactionRequest.responseBody.transactionReference;

      const response = await client.bankTransfer.initializeTransfer(
        transactionRef
      );

      expect(response.requestSuccessful).toBeTrue();
      expect(response.responseBody).toBeObject();
      expect(response.responseBody.status).toBeString();
      expect(response.responseBody.amount).toBeNumber();
      expect(response.responseBody.bankName).toBeString();
    });
  });
});
