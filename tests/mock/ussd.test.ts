import { expect, test, describe, it } from "bun:test";

// Mock ErcaspayClient
class MockErcaspayClient {
    checkout = {
        initiateTransaction: async () => ({
            responseBody: {
                transactionReference: "mock-transaction-ref",
            },
        }),
    };

    ussd = {
        initiateCode: async () => ({
            requestSuccessful: true,
            responseBody: {
                amount: 10000,
                status: "pending",
                ussdCode: "*737*000*12345#",
                paymentCode: "mock-payment-code",
                expires_in: 300,
            },
        }),
        getBankList: async () => ({
            requestSuccessful: true,
            responseBody: [
                { name: "GTBank", code: "058" },
                { name: "Access Bank", code: "044" },
                { name: "Zenith Bank", code: "057" },
            ],
        }),
    };
}

describe("USSD Module Test 🧪", () => {
    const client = new MockErcaspayClient();

    describe("Initiate USSD Code", () => {
        it("Should return a mocked response for initiating USSD code", async () => {
            const initiateTransactionRequest = await client.checkout.initiateTransaction();
            const transactionRef = initiateTransactionRequest.responseBody.transactionReference;

            const response = await client.ussd.initiateCode(
            //     {
            //     bankName: "gtbank",
            //     transactionReference: transactionRef,
            // }
            );

            expect(response.requestSuccessful).toBe(true);
            expect(response.responseBody).toBeDefined();
            expect(response.responseBody.amount).toBe(10000);
            expect(response.responseBody.status).toBe("pending");
            expect(response.responseBody.ussdCode).toBe("*737*000*12345#");
            expect(response.responseBody.paymentCode).toBe("mock-payment-code");
            expect(response.responseBody.expires_in).toBe(300);
        });
    });

    describe("Get Bank List For USSD", () => {
        it("Should return a mocked response for fetching bank list", async () => {
            const response = await client.ussd.getBankList();

            expect(response.requestSuccessful).toBe(true);
            expect(response.responseBody).toBeDefined();
            expect(response.responseBody).toBeInstanceOf(Array);
            expect(response.responseBody.length).toBeGreaterThan(0);
            expect(response.responseBody).toContainEqual({ name: "GTBank", code: "058" });
        });
    });
});
