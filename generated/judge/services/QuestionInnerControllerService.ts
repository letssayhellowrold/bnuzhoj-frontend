/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Question } from "../models/Question";
import type { QuestionSubmit } from "../models/QuestionSubmit";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class QuestionInnerControllerService {
  /**
   * getQuestionById
   * @param questionId questionId
   * @returns Question OK
   * @throws ApiError
   */
  public static getQuestionByIdUsingGet1(
    questionId: number
  ): CancelablePromise<Question> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/judge/inner/get/id",
      query: {
        questionId: questionId,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }
  /**
   * updateQuestionById
   * @param question question
   * @returns boolean OK
   * @returns any Created
   * @throws ApiError
   */
  public static updateQuestionByIdUsingPost(
    question: Question
  ): CancelablePromise<boolean | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/judge/inner/question/update",
      body: question,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }
  /**
   * getQuestionSubmitById
   * @param questionId questionId
   * @returns QuestionSubmit OK
   * @throws ApiError
   */
  public static getQuestionSubmitByIdUsingGet(
    questionId: number
  ): CancelablePromise<QuestionSubmit> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/judge/inner/question_submit/get/id",
      query: {
        questionId: questionId,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }
  /**
   * updateQuestionSubmitById
   * @param questionSubmit questionSubmit
   * @returns boolean OK
   * @returns any Created
   * @throws ApiError
   */
  public static updateQuestionSubmitByIdUsingPost(
    questionSubmit: QuestionSubmit
  ): CancelablePromise<boolean | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/judge/inner/question_submit/update",
      body: questionSubmit,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }
}
