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
        ipAddress: string;
      };
    };
  };
}