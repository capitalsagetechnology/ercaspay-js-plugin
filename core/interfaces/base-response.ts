/**
 * Represents a base response structure for API requests.
 * @template TResponse - The type of the response body.
 */
export interface IBaseResponse<TResponse> {
  /**
   * Indicates whether the request was successful.
   * @type {boolean}
   */
  requestSuccessful: boolean;

  /**
   * A code representing the status of the response (e.g., success, error).
   * @type {string}
   */
  responseCode: string;

  /**
   * A message providing additional details on the response, typically used for errors.
   * @type {string}
   */
  errorMessage: string;

  /**
   * The actual data returned in the response.
   * @type {TResponse}
   */
  responseBody: TResponse;
}
