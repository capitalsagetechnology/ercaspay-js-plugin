import { expect, test, describe, it, beforeEach } from "bun:test";
import { ErcaspayClient } from "./../../";

describe("Transaction Module Test 🧪", () => {
  const client = new ErcaspayClient(
    process.env.SECRET_KEY as string,
    "development"
  );

  describe("Initiate Transaction", async () => {
    it("Should return a 200 status code, with appropriate typed response", async () => {
      const response = await client.transaction.initiate({
        amount: 10000,
        paymentReference: "R5md7gd9b4s3h2j5d67g",
        paymentMethods: "card,bank-transfer,ussd,qrcode",
        customerName: "Adedoyin Emmanuel",
        customerEmail: "hi@adedoyinemmanuel.dev",
        customerPhoneNumber: "09061626364",
        redirectUrl: "https://github.com/adedoyin-emmanuel",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        currency: "NGN",
        feeBearer: "customer",
        metadata: {
          firstname: "Temi",
          lastname: "Girl",
          email: "temigirl@mail.com",
        },
      });

      expect(response.responseCode).toBe("success");
      expect(response.requestSuccessful).toBeTrue();
      expect(response.responseBody).toBeObject();
      expect(response.responseBody.checkoutUrl).toBeString();
      expect(response.responseBody.paymentReference).toBeString();
      expect(response.responseBody.transactionReference).toBeString();
    });
  });

  describe("Cancel Transaction", async () => {
    it("Should cancel a transaction and return a 200 status code, with appropriate typed response", async () => {
      const initiateTransactionRequest = await client.transaction.initiate({
        amount: 10000,
        paymentReference: "R5md7gd9b4s3h2j5d67g",
        paymentMethods: "card,bank-transfer,ussd,qrcode",
        customerName: "Adedoyin Emmanuel",
        customerEmail: "hi@adedoyinemmanuel.dev",
        customerPhoneNumber: "09061626364",
        redirectUrl: "https://github.com/adedoyin-emmanuel",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
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

      const response = await client.transaction.cancel(transactionRef);

      expect(response.requestSuccessful).toBeTrue();
      expect(response.responseBody).toBeObject();
    });
  });

  describe("Check Transaction Status", async () => {
    it("Should check a transaction status and return a 200 status code, with appropriate typed response", async () => {
      const validTransactionRef = "ERCS|20241215043712|1734233832822";

      const response = await client.transaction.getStatus({
        transactionReference: validTransactionRef,
        paymentMethod: "card",
        reference: "P1vpu4GwRb3i1MP",
      });

      expect(response.requestSuccessful).toBeTrue();
      expect(response.responseBody).toBeObject();
      expect(response.responseBody.amount).toBeNumber();
      expect(response.responseBody.status).toBeString();
      expect(response.responseBody.description).toBeString();
    });
  });

  describe("Verify Transaction", async () => {
    it("Should verify a transaction and return a 200 status code, with appropriate typed response", async () => {
      const validTransactionRef = "ERCS|20241216085942|1734335982170";
      const response = await client.transaction.verify(validTransactionRef);

      expect(response.requestSuccessful).toBeTrue();
      expect(response.responseBody).toBeObject();
      expect(response.responseBody.amount).toBeNumber();
      expect(response.responseBody.currency).toBeString();
      expect(response.responseBody.status).toBeString();
      expect(response.responseBody.customer).toBeObject();
      expect(response.responseBody.fee).toBeNumber();
      expect(response.responseBody.settled_amount).toBeNumber();
      expect(response.responseBody.tx_reference).toBeString();
      expect(response.responseBody.domain).toBeString();
      expect(response.responseBody.paid_at).toBeString();
      expect(response.responseBody.created_at).toBeString();
      expect(response.responseBody.channel).toBeString();
      expect(response.responseBody.ercs_reference).toBeString();
    });
  });
});
