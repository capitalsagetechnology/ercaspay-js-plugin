import { expect, describe, it } from "bun:test";

// Mock ErcaspayClient
class MockErcaspayClient {
    checkout = {
        initiateTransaction: async () => ({
            requestSuccessful: true,
            responseBody: {
                transactionReference: "mock-transaction-ref",
            },
        }),
    };

    bankTransfer = {
        initializeTransfer: async (transactionRef: string) => ({
            requestSuccessful: true,
            responseBody: {
                ref: transactionRef, // to be removed
                status: "initialized",
                amount: 10000,
                bankName: "Mock Bank",
            },
        }),
    };
}

describe("Bank Transfer Module Test 🧪", () => {
    const client = new MockErcaspayClient();

    describe("Initiate Bank Transfer", () => {
        it("Should return a mocked response for bank transfer initialization", async () => {
            const initiateTransactionRequest =
                await client.checkout.initiateTransaction();

            const transactionRef =
                initiateTransactionRequest.responseBody.transactionReference;

            const response = await client.bankTransfer.initializeTransfer(transactionRef);

            expect(response.requestSuccessful).toBe(true);
            expect(response.responseBody).toBeObject();
            expect(response.responseBody.status).toBe("initialized");
            expect(response.responseBody.amount).toBe(10000);
            expect(response.responseBody.bankName).toBe("Mock Bank");
        });
    });
});
