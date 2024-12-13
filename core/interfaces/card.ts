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
  transactionReference: string;
  paymentReference: string;
  amount: number;
  redirectUrl: string;
}
