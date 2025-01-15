import { expect, test, describe, it } from "bun:test";

// Mock ErcaspayClient
class MockErcaspayClient {
    transaction = {
        initiate: async () => ({
            responseCode: "success",
            requestSuccessful: true,
            responseBody: {
                checkoutUrl: "https://mock-checkout.url",
                paymentReference: "mock-payment-ref",
                transactionReference: "mock-transaction-ref",
            },
        }),
        cancel: async (transactionReference: string) => ({
            requestSuccessful: true,
            responseBody: {
                message: `Transaction ${transactionReference} canceled successfully`,
            },
        }),
        getStatus: async () => ({
            requestSuccessful: true,
            responseBody: {
                amount: 10000,
                status: "successful",
                description: "Mock transaction status",
            },
        }),
        verify: async () => ({
            requestSuccessful: true,
            responseBody: {
                amount: 10000,
                currency: "NGN",
                status: "successful",
                customer: { name: "Mock User" },
                fee: 100,
                settled_amount: 9900,
                tx_reference: "mock-tx-ref",
                domain: "mock-domain",
                paid_at: "2025-01-15T12:00:00Z",
                created_at: "2025-01-15T10:00:00Z",
                channel: "mock-channel",
                ercs_reference: "mock-ercs-ref",
            },
        }),
        getDetails: async () => ({
            requestSuccessful: true,
            responseBody: {
                amount: 10000,
                customerName: "Mock User",
                customerEmail: "mock@user.email",
                paymentMethods: ["card", "bank-transfer"],
                businessName: "Mock Business",
            },
        }),
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
    });

    describe("Check Transaction Status", () => {
        it("Should return a mocked response for transaction status", async () => {
            const response = await client.transaction.getStatus();

            expect(response.requestSuccessful).toBe(true);
            expect(response.responseBody.amount).toBe(10000);
            expect(response.responseBody.status).toBe("successful");
            expect(response.responseBody.description).toBe("Mock transaction status");
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
    });
});
