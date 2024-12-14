export interface IIntitializeTransferResponse {
  status: string;
  gatewayMessage: string;
  transactionReference: string;
  amount: number;
  accountNumber: string;
  accountEmail: string;
  accountName: string;
  accountReference: string;
  bankName: string;
  expires_in: number;
}
