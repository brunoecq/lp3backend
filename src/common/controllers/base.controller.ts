import {
  StatusCode,
  HttpStatus,
  AuthFailureResponse,
  NotFoundResponse,
  SuccessResponse,
  CreatedResponse,
  ForbiddenResponse,
  ConflictErrorResponse,
  InternalErrorResponse,
  CreateApiResponse,
  ModelApiResponse,
} from '@common/utils/api-response';
import { Response } from 'express';
import { injectable } from 'inversify';

@injectable()
export abstract class BaseController {
  ok<T>(res: Response, data: T, message?: string) {
    return new SuccessResponse<T>(data, message).send(res);
  }
  created(res: Response, message?: string) {
    return new CreatedResponse(message).send(res);
  }
  forbidden(res: Response, message?: string) {
    return new ForbiddenResponse(message).send(res);
  }
  notFound(res: Response, message?: string) {
    return new NotFoundResponse(message).send(res);
  }
  conflict(res: Response, message?: string) {
    return new ConflictErrorResponse(message).send(res);
  }
  internalError(res: Response, message?: string) {
    return new InternalErrorResponse(message).send(res);
  }
  unauthorized(res: Response, message?: string) {
    return new AuthFailureResponse(message).send(res);
  }
  result(
    res: Response,
    status_code: StatusCode,
    status: HttpStatus,
    data?: string | object | any,
    message?: string | any,
    errors?: Array<ModelApiResponse>,
  ) {
    return new CreateApiResponse(status_code, status, data, message, errors).send(res);
  }
}
