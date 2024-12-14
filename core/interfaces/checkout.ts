export interface IInitiateTransactionRequest {
  amount: number;
  paymentReference: string;
  paymentMethods: string;
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
  paymentReference: string;
  transactionReference: string;
  checkoutUrl: string;
}

export interface ICustomer {
  name: string;
  email: string;
  phone_number?: string;
  reference: string;
}

export interface IVerifyCheckoutTransactionResponse {
  domain: string;
  status: string;
  ercs_reference: string;
  tx_reference: string;
  amount: number;
  description: string;
  paid_at: string;
  created_at: string;
  channel: string;
  currency: string;
  metadata?: Record<string, any>;
  fee: number;
  fee_bearer: string;
  settled_amount: number;
  customer: ICustomer;
}
