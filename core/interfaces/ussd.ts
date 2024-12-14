export interface IInitiateCodeRequest {
  transactionReference: string;
  amount: number;
  bankName: string;
}

export interface IInitiateCodeResponse {
  status: string;
  gatewayMessage: string;
  transactionReference: string;
  gatewayReference: string;
  ussdCode: string;
  paymentCode: string;
  amount: number;
}

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
