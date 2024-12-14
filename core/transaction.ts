import ErcaspayBase from "./base";
import type {
  IBaseResponse,
  IGetTransactionDetailsResponse,
} from "./interfaces";


export default class ErcaspayTransaction extends ErcaspayBase {
    private readonly transactionBaseUrl = "/third-party/payment/details";
    

    public async getDetails(transactionReference: string) {
        if (!transactionReference) {
            throw new Error("Transaction reference is required");
        }

        const response = await this.Axios.get<
          IBaseResponse<IGetTransactionDetailsResponse>
        >(`${this.transactionBaseUrl}/${transactionReference}`);

        return response.data;
    }
}