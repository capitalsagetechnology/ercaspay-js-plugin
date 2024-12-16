import { expect, test, describe, it, beforeEach } from "bun:test";
import { ErcaspayClient } from "./../../";

describe("Card Module Test 🧪", () => {
  const client = new ErcaspayClient(
    process.env.SECRET_KEY as string,
    "development"
  );

  describe("Initiate Card Payment", async () => {
    it("Should return a 200 status code, with appropriate typed response", async () => {
      /**
       * TODO
       */
    });
  });

  describe("Submit OTP", async () => {
    it("Should return a 200 status code, with appropriate typed response", async () => {
      /**
       *
       * TODO
       */
    });

    it("Should throw an error if payment or transaction reference is invalid or does not exist", async () => {
      expect(async () => {
        await client.card.submitOTP({
          transactionReference: "invalid-transaction-reference",
          otp: "123456",
          gatewayReference: "srghjasdg93as",
        });
      });
    });
  });

  describe("Resend OTP", async () => {
    it("Should return a 200 status code, with appropriate typed response", async () => {
      /**
       * TODO
       */
    });

    it("Should throw an error if transaction reference is invalid or does not exist", async () => {
      expect(async () => {
        await client.card.resendOTP({
          transactionReference: "invalid-transaction-reference",
          gatewayReference: "srghjasdg93as",
        });
      });
    });
  });

  describe("Get Card Details", async () => {
    it("Should return a 200 status code, with appropriate typed response", async () => {
      const validTransactionReference = "ERCS|20241216064129|1734327689500";
      const response = await client.card.getDetails(validTransactionReference);

      expect(response.requestSuccessful).toBe(true);
      expect(response.responseBody).toBeObject();
      expect(response.responseBody.currency).toBeString();
      expect(response.responseBody.amount).toBeNumber();
      expect(response.responseBody.reference).toBeString();
    });

    it("Should throw an error if transaction reference is invalid or does not exist", async () => {
      expect(async () => {
        const invalidTransactionReference = "invalid-transaction-reference";
        await client.card.getDetails(invalidTransactionReference);
      });
    });
  });
});
