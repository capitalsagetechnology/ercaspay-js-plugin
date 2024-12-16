import ErcaspayBase from "./base";
import type {
  IBaseResponse,
  ICancelTransactionResponse,
  IInitiateCodeRequest,
  IInitiateCodeResponse,
} from "./interfaces";
import { initiateCodeSchema } from "./../helpers/validations";

/**
 * ErcaspayUSSD handles operations related to initiating USSD codes, fetching supported banks,
 * and canceling USSD transactions.
 *
 * @class ErcaspayUSSD
 * @extends ErcaspayBase
 */
export default class ErcaspayUSSD extends ErcaspayBase {
  /**
   * Base URL for all USSD-related API endpoints.
   * @private
   * @readonly
   */
  private readonly ussdBaseUrl = "/payment/ussd";

  /**
   * Initiates a USSD code for a specific transaction reference.
   *
   * @param {IInitiateCodeRequest} data - The details required to initiate the USSD code, including the transaction reference and bank name.
   * @throws {Error} If validation of input data fails.
   * @returns {Promise<IBaseResponse<IInitiateCodeResponse>>} A promise resolving to the USSD initiation response.
   *
   * @example
   * const ussd = new ErcaspayUSSD();
   * const data = {
   *   transactionReference: "txn_063_imet_12345",
   *   bankName: "GTBank",
   * };
   * const response = await ussd.initiateCode(data);
   * console.log(response);
   */
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

  /**
   * Fetches the list of supported banks for USSD transactions.
   *
   * @returns {Promise<IBaseResponse<string[]>>} A promise resolving to an array of supported bank names.
   *
   * @example
   * const ussd = new ErcaspayUSSD();
   * const bankList = await ussd.getBankList();
   * console.log(bankList);
   */
  public async getBankList() {
    const response = await this.Axios.get<IBaseResponse<string[]>>(
      `${this.ussdBaseUrl}/supported-banks`
    );

    return response.data;
  }

  public async cancel(transactionReference: string) {
    if (!transactionReference) {
      throw new Error("Transaction reference is required");
    }

    const response = await this.Axios.get<
      IBaseResponse<ICancelTransactionResponse>
    >(`${this.ussdBaseUrl}/cancel/${transactionReference}`);

    return response.data;
  }
}
