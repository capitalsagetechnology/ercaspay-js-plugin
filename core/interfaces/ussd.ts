export interface IInitiateCodeRequest {
  transactionReference: string;
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
  expires_in: number;
}
