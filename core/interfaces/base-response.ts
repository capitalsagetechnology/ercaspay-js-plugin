export interface IBaseResponse<TResponse> {
  requestSuccessful: boolean;
  responseCode: string;
  errorMessage: string;
  responseBody: TResponse | [];
}
