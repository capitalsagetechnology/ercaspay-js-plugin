export interface IInitiateTransactionRequest {
  amount: number;
  paymentReference: string;
  paymentMethods?: string;
  customerName: string;
  customerEmail: string;
  customerPhoneNumber?: string;
  currency: string;
  feeBearer?: "customer" | "merchant";
  redirectUrl?: string;
  description?: string;
  metadata?: Record<string, any>;
}

export interface IInitiateTransactionResponse {
  transactionId: string;
  paymentUrl: string;
  expiry: string;
}
