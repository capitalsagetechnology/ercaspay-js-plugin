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
