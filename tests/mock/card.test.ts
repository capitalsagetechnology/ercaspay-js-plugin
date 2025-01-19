import { expect, test, describe, it } from "bun:test";

// Mock ErcaspayClient
class MockErcaspayClient {
    private validateTransactionRef(ref: string) {
        if (ref === "invalid-transaction-reference") {
            throw new Error("Invalid transaction reference");
        }
    }

    private validateOTP(otp: string) {
        if (!/^\d{6}$/.test(otp)) {
            throw new Error("Invalid OTP format");
        }
    }

    private async simulateDelay() {
        await new Promise(resolve => setTimeout(resolve, Math.random() * 1000));
    }

    private readonly MOCK_DATA = {
        transactionReference: "mock-transaction-ref",
        paymentReference: "mock-payment-ref",
        amount: 10000,
        currency: "NGN",
        status: "initiated",
        successMessage: "Operation successful",
    };

    card = {
        initiatePayment: async () => {
            await this.simulateDelay();
            return {
                requestSuccessful: true,
                responseBody: {
                    ...this.MOCK_DATA,
                    status: this.MOCK_DATA.status,
                },
            };
        },

        submitOTP: async (data: { transactionReference: string; otp: string }) => {
            await this.simulateDelay();
            this.validateTransactionRef(data.transactionReference);
            this.validateOTP(data.otp);
            return {
                requestSuccessful: true,
                responseBody: {
                    message: "OTP successfully submitted",
                    status: "verified",
                },
            };
        },

        resendOTP: async (data: { transactionReference: string }) => {
            await this.simulateDelay();
            this.validateTransactionRef(data.transactionReference);
            return {
                requestSuccessful: true,
                responseBody: {
                    message: "OTP successfully resent",
                },
            };
        },

        getDetails: async (transactionReference: string) => {
            await this.simulateDelay();
            this.validateTransactionRef(transactionReference);
            return {
                requestSuccessful: true,
                responseBody: {
                    currency: this.MOCK_DATA.currency,
                    amount: this.MOCK_DATA.amount,
                    reference: this.MOCK_DATA.transactionReference,
                    status: "successful",
                },
            };
        },

        verifyTransaction: async (transactionReference: string) => {
            await this.simulateDelay();
            this.validateTransactionRef(transactionReference);
            return {
                requestSuccessful: true,
                responseBody: {
                    status: "verified",
                    message: "Transaction successfully verified",
                },
            };
        },
    };
}

describe("Card Module Test 🧪", () => {
    const client = new MockErcaspayClient();

    describe("Initiate Card Payment", () => {
        it("Should return a mocked response for card payment initiation", async () => {
            const response = await client.card.initiatePayment();
            expect(response.requestSuccessful).toBe(true);
            expect(response.responseBody.transactionReference).toBe("mock-transaction-ref");
            expect(response.responseBody.currency).toBe("NGN");
            expect(response.responseBody.amount).toBe(10000);
            expect(response.responseBody.status).toBe("initiated");
        });
    });

    describe("Submit OTP", () => {
        it("Should return a mocked response for OTP submission", async () => {
            const response = await client.card.submitOTP({
                transactionReference: "mock-transaction-ref",
                otp: "123456",
            });
            expect(response.requestSuccessful).toBe(true);
            expect(response.responseBody.message).toBe("OTP successfully submitted");
            expect(response.responseBody.status).toBe("verified");
        });

        it("Should throw an error for an invalid transaction reference", async () => {
            expect(client.card.submitOTP({
                transactionReference: "invalid-transaction-reference",
                otp: "123456",
            })).rejects.toThrow("Invalid transaction reference");
        });
    });

    describe("Resend OTP", () => {
        it("Should return a mocked response for resending OTP", async () => {
            const response = await client.card.resendOTP({
                transactionReference: "mock-transaction-ref",
            });
            expect(response.requestSuccessful).toBe(true);
            expect(response.responseBody.message).toBe("OTP successfully resent");
        });

        it("Should throw an error for an invalid transaction reference", async () => {
            expect(client.card.resendOTP({
                transactionReference: "invalid-transaction-reference",
            })).rejects.toThrow("Invalid transaction reference");
        });
    });

    describe("Get Card Details", () => {
        it("Should return a mocked response for card details", async () => {
            const response = await client.card.getDetails("mock-transaction-ref");
            expect(response.requestSuccessful).toBe(true);
            expect(response.responseBody.currency).toBe("NGN");
            expect(response.responseBody.amount).toBe(10000);
            expect(response.responseBody.reference).toBe("mock-reference");
        });

        it("Should throw an error for an invalid transaction reference", async () => {
            expect(client.card.getDetails("invalid-transaction-reference")).rejects.toThrow(
                "Invalid transaction reference"
            );
        });
    });

    describe("Verify Card Transaction", () => {
        it("Should return a mocked response for transaction verification", async () => {
            const response = await client.card.verifyTransaction("mock-transaction-ref");
            expect(response.requestSuccessful).toBe(true);
            expect(response.responseBody.status).toBe("verified");
            expect(response.responseBody.message).toBe("Transaction successfully verified");
        });

        it("Should throw an error for an invalid transaction reference", async () => {
            expect(client.card.verifyTransaction("invalid-transaction-reference")).rejects.toThrow(
                "Invalid transaction reference"
            );
        });
    });
});
