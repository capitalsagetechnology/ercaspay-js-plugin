import axios, { AxiosInstance, type AxiosResponse } from "axios";
import type { IBaseResponse } from "./interfaces";

/**
 * Base class for interacting with the Ercaspay API.
 * Provides a configurable HTTP client with predefined headers, environment-specific base URLs,
 * and response interceptors to handle API responses and errors.
 */
export default abstract class ErcaspayBase {
  /**
   * The secret key for authenticating API requests.
   * @protected
   */
  protected secretKey: string;

  /**
   * An Axios instance used for making HTTP requests to the API.
   * @protected
   */
  protected Axios: AxiosInstance;

  /**
   * The base URL for the Ercaspay API (sandbox or production).
   * @protected
   */
  protected baseUrl: string;

  /**
   * The current environment ('development' or 'production').
   * Defaults to 'development'.
   * @protected
   */
  protected environment: string = process?.env.NODE_ENV || "development";

  /**
   * Initializes an instance of the ErcaspayBase class.
   *
   * @param {string} secretKey - The secret key used to authenticate requests.
   * @param {"development" | "production"} [environment] - The environment for the API (defaults to 'development').
   *
   * @throws {Error} If the secret key is not provided.
   */
  constructor(secretKey: string, environment?: "development" | "production") {
    if (!secretKey) throw new Error("Secret key is required");

    /**
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

  /**
   * Adds response interceptors to the Axios instance.
   * Interceptors handle successful responses and errors.
   *
   * @private
   */
  private addInterceptors() {
    this.Axios.interceptors.response.use(
      /**
       * Handles successful API responses.
       *
       * @param {AxiosResponse<IBaseResponse<any>>} response - The API response.
       * @returns {AxiosResponse<IBaseResponse<any>>} The processed response.
       * @throws {Error} If the response indicates the request was unsuccessful.
       */
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
      /**
       * Handles API errors and network issues.
       *
       * @param {any} error - The error object from Axios.
       * @returns {Promise<never>} A rejected promise with the error message.
       */
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
