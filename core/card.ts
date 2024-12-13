import ErcaspayBase from "./base";
import type {
  ICardRequest,
  IBaseResponse,
  ICardResponse,
  ISubmitOTPRequest,
  ISubmitOTPResponse,
} from "./interfaces";
import { cardSchema, submitOTPSchema } from "../helpers/validations";

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
}
