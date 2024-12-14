export interface ICardRequest {
  payload: string;
  transactionReference: string;

  deviceDetails: {
    payerDeviceDto: {
      device: {
        browser: string;
        browserDetails: {
          "3DSecureChallengeWindowSize": string;
          acceptHeaders: string;
          colorDepth: number;
          javaEnabled: boolean;
          language: string;
          screenHeight: number;
          screenWidth: number;
          timeZone: number;
        };
        ipAddress?: string;
      };
    };
  };
}

export interface ICardResponse {
  code: string;
  status: string;
  gatewayMessage: string;
  supportMessage?: string;
  transactionReference: string;
  paymentReference: string;
  amount: number;
  redirectUrl: string;
  gatewayReference?: string;
  eciFlag?: string;
  transactionAuth?: string;
  transactionId?: string;
  transactionRef?: string;
  transactionAuthLink?: string;
}

export interface ISubmitOTPRequest {
  otp: string;
  gatewayReference: string;
  transactionReference: string;
}

export interface ISubmitOTPResponse {
  status: string;
  gatewayMessage: string;
  transactionReference: string;
  paymentReference: string;
  amount: number;
  callbackUrl: string;
}

export interface IResendOTPRequest extends Omit<ISubmitOTPRequest, "otp"> {}

export interface IResendOTPResponse
  extends Omit<ISubmitOTPResponse, "amount" | "callbackUrl"> {}

export interface IGetCardDetailsResponse {
  amount: number;
  reference: string;
}

export interface IVerifyCardTransactionResponse {}
