/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_long_ } from "../models/BaseResponse_long_";
import type { QuestionSubmitAddRequest } from "../models/QuestionSubmitAddRequest";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class QuestionSubmitControllerService {
  /**
   * doQuestionSubmit
   * @param questionSubmitAddRequest questionSubmitAddRequest
   * @returns BaseResponse_long_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static doQuestionSubmitUsingPost(
    questionSubmitAddRequest: QuestionSubmitAddRequest
  ): CancelablePromise<BaseResponse_long_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/question_submit/",
      body: questionSubmitAddRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }
}
