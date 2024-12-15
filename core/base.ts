import axios, { AxiosInstance, type AxiosResponse } from "axios";
import type { IBaseResponse } from "./interfaces";

export default abstract class ErcaspayBase {
  protected secretKey: string;
  protected Axios: AxiosInstance;
  protected baseUrl: string;

  protected environment: string = process?.env.NODE_ENV || "development";

  constructor(secretKey: string, environment?: "development" | "production") {
    if (!secretKey) throw new Error("Secret key is required");

    /**
     *
     * Environment not set, defaulting to development
     */

    const SANDBOX_URL = "https://gw.ercaspay.com/api/v1";
    const PRODUCTION_URL = "https://api.ercaspay.com/api/v1";

    this.secretKey = secretKey;
    this.environment = environment || "development";
    this.baseUrl =
      this.environment === "development" ? SANDBOX_URL : PRODUCTION_URL;

    this.Axios = axios.create({
      baseURL: this.baseUrl,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.secretKey}`,
      },
    });

    this.addInterceptors();
  }

  private addInterceptors() {
    this.Axios.interceptors.response.use(
      (response: AxiosResponse<IBaseResponse<any>>) => {
        if (response.data.requestSuccessful) {
          return {
            ...response,
            data: response.data,
          };
        } else {
          throw new Error(
            response.data.errorMessage || "An unknown error occurred"
          );
        }
      },
      (error) => {
        return Promise.reject(
          error?.response?.data?.errorMessage ||
            error.message ||
            "Network Error"
        );
      }
    );
  }
}
