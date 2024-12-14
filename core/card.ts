import ErcaspayBase from "./base";
import type {
  ICardRequest,
  IBaseResponse,
  ICardResponse,
  ISubmitOTPRequest,
  ISubmitOTPResponse,
  IResendOTPRequest,
  IResendOTPResponse,
  IGetCardDetailsRequest,
  IGetCardDetailsResponse,
} from "./interfaces";
import {
  cardSchema,
  submitOTPSchema,
  resendOTPSchema,
} from "../helpers/validations";

export default class ErcaspayCard extends ErcaspayBase {
  private readonly cardBaseUrl = "/third-party/payment/cards";
  public async initiatePayment(
    data: ICardRequest
  ): Promise<IBaseResponse<ICardResponse>> {
    const values = await cardSchema.validateAsync(data);

    if (values.error) {
      throw new Error(values.error.message);
    }

    const response = await this.Axios.post<IBaseResponse<ICardResponse>>(
      `${this.cardBaseUrl}/initialize`
    );

    return response.data;
  }

  public async submitOTP(data: ISubmitOTPRequest) {
    const values = await submitOTPSchema.validateAsync(data);

    if (values.error) {
      throw new Error(values.error.message);
    }

    const { transactionReference, ...dataExcludingTransactionReference } = data;

    const response = await this.Axios.post<IBaseResponse<ISubmitOTPResponse>>(
      `${this.cardBaseUrl}/otp/submit/${transactionReference}`,
      dataExcludingTransactionReference
    );

    return response.data;
  }

  public async resendOTP(data: IResendOTPRequest) {
    const values = await resendOTPSchema.validateAsync(data);

    if (values.error) {
      throw new Error(values.error.message);
    }

    const { transactionReference, ...dataExcludingTransactionReference } = data;

    const response = await this.Axios.post<IBaseResponse<IResendOTPResponse>>(
      `${this.cardBaseUrl}/otp/resend/${transactionReference}`,
      dataExcludingTransactionReference
    );

    return response.data;
  }


  public async getDetails(transactionReference: string) {
    if (!transactionReference) { 
      throw new Error("Transaction reference is required");
    }
    const response = await this.Axios.get<
      IBaseResponse<IGetCardDetailsResponse>
    >(`${this.cardBaseUrl}/details/${transactionReference}`);

    return response.data;
  }

  public async verifyTransaction() {
    
  }
}
