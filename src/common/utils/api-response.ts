import { Response } from 'express';
import { StatusCodes as HttpStatus, getReasonPhrase } from 'http-status-codes';

/**
@StatusCode Helper code for the API consumer to understand the error and handle is accordingly 
**/
export enum StatusCode {
  SUCCESS = '10000',
  FAILURE = '10001',
  RETRY = '10002',
  INVALID_ACCESS_TOKEN = '10003',
  MODEL_IS_NOT_VALID = '10004',
}

class ApiResponse {
  constructor(protected status_code: StatusCode, protected status: HttpStatus, protected message?: string) {
    this.status_code = status_code;
    this.status = status;
    this.message = message;
  }
  public send(res: Response) {
    return res.status(this.status).json(this);
  }
}

export interface ModelApiResponse {
  message: string;
  property: string;
}

export class AuthFailureResponse extends ApiResponse {
  constructor(message = 'Authentication Failure') {
    super(StatusCode.FAILURE, HttpStatus.UNAUTHORIZED, message);
  }
}

export class NotFoundResponse extends ApiResponse {
  private url: string | undefined;

  constructor(message = getReasonPhrase(HttpStatus.NOT_FOUND)) {
    super(StatusCode.FAILURE, HttpStatus.NOT_FOUND, message);
  }

  send(res: Response): Response {
    this.url = res.req?.originalUrl;
    return super.send(res);
  }
}
export class ForbiddenResponse extends ApiResponse {
  constructor(message = getReasonPhrase(HttpStatus.FORBIDDEN)) {
    super(StatusCode.FAILURE, HttpStatus.FORBIDDEN, message);
  }
}

export class BadRequestResponse extends ApiResponse {
  constructor(message = getReasonPhrase(HttpStatus.BAD_REQUEST)) {
    super(StatusCode.FAILURE, HttpStatus.BAD_REQUEST, message);
  }
}
export class ConflictErrorResponse extends ApiResponse {
  constructor(message = getReasonPhrase(HttpStatus.CONFLICT)) {
    super(StatusCode.FAILURE, HttpStatus.CONFLICT, message);
  }
}
export class InternalErrorResponse extends ApiResponse {
  constructor(message = getReasonPhrase(HttpStatus.INTERNAL_SERVER_ERROR)) {
    super(StatusCode.FAILURE, HttpStatus.INTERNAL_SERVER_ERROR, message);
  }
}

export class SuccessMsgResponse extends ApiResponse {
  constructor(message: string) {
    super(StatusCode.SUCCESS, HttpStatus.OK, message);
  }
}

export class FailureMsgResponse extends ApiResponse {
  constructor(message: string) {
    super(StatusCode.FAILURE, HttpStatus.OK, message);
  }
}

export class CreatedResponse<T> extends ApiResponse {
  constructor(message: string = getReasonPhrase(HttpStatus.CREATED)) {
    super(StatusCode.SUCCESS, HttpStatus.CREATED, message);
  }
}

export class SuccessResponse<T> extends ApiResponse {
  constructor(private data: T, message: string = getReasonPhrase(HttpStatus.OK)) {
    super(StatusCode.SUCCESS, HttpStatus.OK, message);
  }
}

export class AccessTokenErrorResponse extends ApiResponse {
  private instruction = 'refresh_token';

  constructor(message = 'Access token invalid') {
    super(StatusCode.INVALID_ACCESS_TOKEN, HttpStatus.UNAUTHORIZED, message);
  }

  send(res: Response): Response {
    res.setHeader('instruction', this.instruction);
    return super.send(res);
  }
}

export class TokenRefreshResponse extends ApiResponse {
  constructor(message: string, private accessToken: string, private refreshToken: string) {
    super(StatusCode.SUCCESS, HttpStatus.UNAUTHORIZED, message);
  }
}

export class CreateApiResponse extends ApiResponse {
  constructor(
    protected status_code: StatusCode,
    protected status: HttpStatus,
    private data?: string | object | any,
    protected message: string | any = getReasonPhrase(status),
    private errors?: Array<ModelApiResponse>,
  ) {
    if (message === null || typeof message === undefined) message = getReasonPhrase(status);
    super(status_code, status, message);
  }
}

export { HttpStatus, getReasonPhrase };
