import { expect, test, describe, it } from "bun:test";

// Mock ErcaspayClient
class MockErcaspayClient {
    transaction = {
        initiate: async (amount?: number) => {
            if (amount <= 0) {
                throw new Error("Invalid amount specified");
            }
            return {
                responseCode: "success",
                requestSuccessful: true,
                responseBody: {
                    checkoutUrl: "https://mock-checkout.url",
                    paymentReference: "mock-payment-ref",
                    transactionReference: "mock-transaction-ref",
                },
            };
        },
        cancel: async (transactionReference: string) => {
            if (transactionReference === "invalid-transaction-ref") {
                throw new Error("Invalid transaction reference");
            }
            return {
                requestSuccessful: true,
                responseBody: {
                    message: `Transaction ${transactionReference} canceled successfully`,
                },
            }
        },
        getStatus: async (transactionReference?: string) => {
            if (transactionReference === "failed-tx-ref") {
                return Promise.reject(new Error("Transaction retrieval failed"));
            }
            return {
                requestSuccessful: true,
                responseBody: {
                    amount: 10000,
                    status: "successful",
                    description: "Mock transaction status",
                },
            };
        },

        verify: async (transactionReference?: string) => {
            if (transactionReference === "failed-tx-ref") {
                throw new Error("Transaction verification failed");
            }
            return {
                requestSuccessful: true,
                responseBody: {
                    amount: 10000,
                    currency: "NGN",
                    status: "successful",
                    customer: {name: "Mock User"},
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
        getDetails: async (transactionReference?: string) => {
            if (transactionReference === "invalid-transaction-ref") {
                throw new Error("Invalid transaction reference");
            }
            return {
                requestSuccessful: true,
                responseBody: {
                    amount: 10000,
                    customerName: "Mock User",
                    customerEmail: "mock@user.email",
                    paymentMethods: ["card", "bank-transfer"],
                    businessName: "Mock Business",
                    reference: "mock-reference",
                },
            };
        },
    };
}

describe("Transaction Module Test 🧪", () => {
    const client = new MockErcaspayClient();

    describe("Initiate Transaction", () => {
        it("Should return a mocked response for transaction initiation", async () => {
            const response = await client.transaction.initiate();

            expect(response.responseCode).toBe("success");
            expect(response.requestSuccessful).toBe(true);
            expect(response.responseBody.checkoutUrl).toBe("https://mock-checkout.url");
            expect(response.responseBody.paymentReference).toBe("mock-payment-ref");
            expect(response.responseBody.transactionReference).toBe("mock-transaction-ref");
        });

        it("Should handle invalid amount during transaction initiation", async () => {
            expect(client.transaction.initiate(-100)).rejects.toThrow(
                "Invalid amount specified"
            );
        });
    });

    describe("Cancel Transaction", () => {
        it("Should cancel a transaction and return a mocked response", async () => {
            const transactionRef = "mock-transaction-ref";
            const response = await client.transaction.cancel(transactionRef);

            expect(response.requestSuccessful).toBe(true);
            expect(response.responseBody.message).toBe(
                `Transaction ${transactionRef} canceled successfully`
            );
        });

        it("Should handle invalid transaction reference during cancellation", async () => {
            expect(client.transaction.cancel("invalid-transaction-ref")).rejects.toThrow(
                "Invalid transaction reference"
            );
        });
    });

    describe("Check Transaction Status", () => {
        it("Should return a mocked response for transaction status", async () => {
            const response = await client.transaction.getStatus();

            expect(response.requestSuccessful).toBe(true);
            expect(response.responseBody.amount).toBe(10000);
            expect(response.responseBody.status).toBe("successful");
            expect(response.responseBody.description).toBe("Mock transaction status");
        });

        it("Should handle failed transaction status", async () => {
            await expect(client.transaction.getStatus("failed-tx-ref")).rejects.toThrow(
                "Transaction retrieval failed"
            );
        });
    });

    describe("Verify Transaction", () => {
        it("Should return a mocked response for transaction verification", async () => {
            const response = await client.transaction.verify();

            expect(response.requestSuccessful).toBe(true);
            expect(response.responseBody.amount).toBe(10000);
            expect(response.responseBody.currency).toBe("NGN");
            expect(response.responseBody.status).toBe("successful");
            expect(response.responseBody.customer).toEqual({ name: "Mock User" });
        });

        it("Should handle failed transaction verification", async () => {
            expect(client.transaction.verify("failed-tx-ref")).rejects.toThrow(
                "Transaction verification failed"
            );
        });
    });

    describe("Check Transaction Details", () => {
        it("Should return a mocked response for transaction details", async () => {
            const response = await client.transaction.getDetails();

            expect(response.requestSuccessful).toBe(true);
            expect(response.responseBody.amount).toBe(10000);
            expect(response.responseBody.customerName).toBe("Mock User");
            expect(response.responseBody.customerEmail).toBe("mock@user.email");
            expect(response.responseBody.paymentMethods).toEqual(["card", "bank-transfer"]);
            expect(response.responseBody.businessName).toBe("Mock Business");
        });

        it("Should handle invalid transaction reference for details retrieval", async () => {
            expect(client.transaction.getDetails("invalid-transaction-ref")).rejects.toThrow(
                "Invalid transaction reference"
            );
        });
    });
});
