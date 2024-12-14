import ErcaspayBase from "./base";
import type {
  IBaseResponse,
  IInitiateCodeRequest,
  IInitiateCodeResponse,
  IGetTransactionDetailsResponse,
} from "./interfaces";
import { initiateCodeSchema } from "./../helpers/validations";

export default class ErcaspayUSSD extends ErcaspayBase {
  private readonly ussdBaseUrl = "/payment/ussd";

  public async initiateCode(data: IInitiateCodeRequest) {
    const values = await initiateCodeSchema.validateAsync(data);

    if (values.error) {
      throw new Error(values.error.message);
    }

    const { bankName, transactionReference, ...others } = data;

    const modifiedDataToSend = {
      ...others,
      bank_name: bankName,
    };

    const response = await this.Axios.post<
      IBaseResponse<IInitiateCodeResponse>
    >(
      `${this.ussdBaseUrl}/request-ussd-code/${transactionReference}`,
      modifiedDataToSend
    );

      return response.data;
  }


  public async getBankList() {
    const response = await this.Axios.get<IBaseResponse<string[]>>(
      `${this.ussdBaseUrl}/supported-banks`
    );

    return response.data;
  }

}
