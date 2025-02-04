import { expect, test, describe, it } from "bun:test";

// Mock ErcaspayClient
class MockErcaspayClient {
    checkout = {
        initiateTransaction: async () => ({
            responseCode: "success",
            requestSuccessful: true,
            responseBody: {
                checkoutUrl: "https://mock-checkout.url",
                paymentReference: "mock-payment-ref",
                transactionReference: "mock-transaction-ref",
            },
        }),
        verifyTransaction: async (transactionReference: string) => {
            if (transactionReference === "AN-INALID-TRANSACTION-REF") {
                throw new Error("Transaction reference does not exist");
            }
            return {
                responseCode: "success",
                requestSuccessful: true,
                responseBody: {
                    amount: 10000,
                    currency: "NGN",
                    status: "successful",
                    customer: { name: "Mock User", email: "mock@user.email" },
                    fee: 100,
                    settled_amount: 9900,
                    tx_reference: "mock-tx-ref",
                    domain: "mock-domain",
                    paid_at: "2025-01-15T12:00:00Z",
                    created_at: "2025-01-15T10:00:00Z",
                    channel: "mock-channel",
                    ercs_reference: "mock-ercs-ref",
                },
            };
        },
    };
}

describe("Checkout Module Test 🧪", () => {
    const client = new MockErcaspayClient();

    describe("Initiate Checkout Transaction", () => {
        it("Should return a mocked response for checkout transaction initiation", async () => {
            const response = await client.checkout.initiateTransaction();

            expect(response.responseCode).toBe("success");
            expect(response.requestSuccessful).toBe(true);
            expect(response.responseBody.checkoutUrl).toBe("https://mock-checkout.url");
            expect(response.responseBody.paymentReference).toBe("mock-payment-ref");
            expect(response.responseBody.transactionReference).toBe("mock-transaction-ref");
        });
    });

    describe("Verify Checkout Transaction", () => {
        it("Should return a mocked response for verifying a checkout transaction", async () => {
            const validTransactionRef = "ERCS|20241214214035|1734208835283";
            const response = await client.checkout.verifyTransaction(validTransactionRef);

            expect(response.responseCode).toBe("success");
            expect(response.requestSuccessful).toBe(true);
            expect(response.responseBody.amount).toBe(10000);
            expect(response.responseBody.currency).toBe("NGN");
            expect(response.responseBody.status).toBe("successful");
            expect(response.responseBody.customer).toEqual({
                name: "Mock User",
                email: "mock@user.email",
            });
            expect(response.responseBody.fee).toBe(100);
            expect(response.responseBody.settled_amount).toBe(9900);
            expect(response.responseBody.tx_reference).toBe("mock-tx-ref");
            expect(response.responseBody.domain).toBe("mock-domain");
            expect(response.responseBody.paid_at).toBe("2025-01-15T12:00:00Z");
            expect(response.responseBody.created_at).toBe("2025-01-15T10:00:00Z");
            expect(response.responseBody.channel).toBe("mock-channel");
            expect(response.responseBody.ercs_reference).toBe("mock-ercs-ref");
        });

        it("Should throw an error if transaction reference does not exist", async () => {
            const invalidTransactionRef = "AN-INALID-TRANSACTION-REF";

            await expect(
                client.checkout.verifyTransaction(invalidTransactionRef)
            ).rejects.toThrowError("Transaction reference does not exist");
        });
    });
});
