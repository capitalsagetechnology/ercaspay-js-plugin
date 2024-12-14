import type { IVerifyCheckoutTransactionResponse } from "./checkout";

export interface IGetTransactionDetailsResponse {
  customerName: string;
  customerEmail: string;
  amount: number;
  businessName: string;
  businessLogo: string;
  whiteLabel: {
    id: number;
    logo_url: string;
    primary_color: string;
    accent_color: string;
    font_family: string;
    font_color: string;
    has_admin_approved: string;
  };
  paymentMethods: string[];
}

export interface IVerifyTransactionResponse
  extends IVerifyCheckoutTransactionResponse {}

export interface IGetTransactionStatusRequest {
  paymentMethod: string;
  reference: string;
  transactionReference: string;
}

export interface IGetTransactionStatusResponse {
  paymentReference: string;
  amount: number;
  status: string;
  description: string;
  callbackUrl: string;
}
