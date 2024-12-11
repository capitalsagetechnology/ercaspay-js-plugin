import axios, { Axios } from "axios";

export default abstract class ErcaspayBase {
  protected secretKey: string;
  protected Axios: Axios;
  protected baseUrl: string;

  protected environment: string = process?.env.NODE_ENV || "development";

  constructor(
    secretKey: string,
    environment?: "development" | "production"
  ) {
    if (!secretKey) throw new Error("Secret key is required");
    if (!environment) {
      console.warn("Environment not set, defaulting to development");
    }

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
  }
}
