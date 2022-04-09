import { StatusCodes as HttpStatus, getReasonPhrase } from 'http-status-codes';
/**
 * @param response string or object describing the error condition.
 * @param status HTTP response status code.
 */
export class HttpException extends Error {
  timestamp?: string;
  stack?: string;
  status: number;
  constructor(message: string | object | any, status: number, stack?: string) {
    super(message);
    this.message = message;
    this.status = status;
    this.timestamp = new Date().toISOString();
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export class BadRequestException extends HttpException {
  constructor(message: string | object | any = getReasonPhrase(HttpStatus.BAD_REQUEST)) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
export class UnauthorizedException extends HttpException {
  constructor(message: string | object | any = getReasonPhrase(HttpStatus.UNAUTHORIZED)) {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}
export class PaymentRequiredException extends HttpException {
  constructor(message: string | object | any = getReasonPhrase(HttpStatus.PAYMENT_REQUIRED)) {
    super(message, HttpStatus.PAYMENT_REQUIRED);
  }
}

export class ForbiddenException extends HttpException {
  constructor(message: string | object | any = getReasonPhrase(HttpStatus.FORBIDDEN)) {
    super(message, HttpStatus.FORBIDDEN);
  }
}
export class NotFoundException extends HttpException {
  constructor(message: string | object | any = getReasonPhrase(HttpStatus.NOT_FOUND)) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
export class MethodNotAllowedException extends HttpException {
  constructor(message: string | object | any = getReasonPhrase(HttpStatus.METHOD_NOT_ALLOWED)) {
    super(message, HttpStatus.METHOD_NOT_ALLOWED);
  }
}
export class NotAcceptableException extends HttpException {
  constructor(message: string | object | any = getReasonPhrase(HttpStatus.NOT_ACCEPTABLE)) {
    super(message, HttpStatus.NOT_ACCEPTABLE);
  }
}

export class ProxyAuthenticationRequiredException extends HttpException {
  constructor(message: string | object | any = getReasonPhrase(HttpStatus.PROXY_AUTHENTICATION_REQUIRED)) {
    super(message, HttpStatus.PROXY_AUTHENTICATION_REQUIRED);
  }
}

export class RequestTimeoutException extends HttpException {
  constructor(message: string | object | any = getReasonPhrase(HttpStatus.REQUEST_TIMEOUT)) {
    super(message, HttpStatus.REQUEST_TIMEOUT);
  }
}

export class ConflictException extends HttpException {
  constructor(message: string | object | any = getReasonPhrase(HttpStatus.CONFLICT)) {
    super(message, HttpStatus.CONFLICT);
  }
}

export class GoneException extends HttpException {
  constructor(message: string | object | any = getReasonPhrase(HttpStatus.NOT_ACCEPTABLE)) {
    super(message, HttpStatus.NOT_ACCEPTABLE);
  }
}
export class LengthRequiredException extends HttpException {
  constructor(message: string | object | any = getReasonPhrase(HttpStatus.LENGTH_REQUIRED)) {
    super(message, HttpStatus.LENGTH_REQUIRED);
  }
}
export class PreconditionFailedException extends HttpException {
  constructor(message: string | object | any = getReasonPhrase(HttpStatus.PRECONDITION_FAILED)) {
    super(message, HttpStatus.PRECONDITION_FAILED);
  }
}
export class RequestTooLongException extends HttpException {
  constructor(message: string | object | any = getReasonPhrase(HttpStatus.REQUEST_TOO_LONG)) {
    super(message, HttpStatus.REQUEST_TOO_LONG);
  }
}
export class UnsupportedMediaTypeException extends HttpException {
  constructor(message: string | object | any = getReasonPhrase(HttpStatus.UNSUPPORTED_MEDIA_TYPE)) {
    super(message, HttpStatus.UNSUPPORTED_MEDIA_TYPE);
  }
}
export class RequestRangeNotSatisfiableException extends HttpException {
  constructor(message: string | object | any = getReasonPhrase(HttpStatus.REQUESTED_RANGE_NOT_SATISFIABLE)) {
    super(message, HttpStatus.REQUESTED_RANGE_NOT_SATISFIABLE);
  }
}
export class ExpectationFailedException extends HttpException {
  constructor(message: string | object | any = getReasonPhrase(HttpStatus.EXPECTATION_FAILED)) {
    super(message, HttpStatus.EXPECTATION_FAILED);
  }
}
export class ImATeapotException extends HttpException {
  constructor(message: string | object | any = getReasonPhrase(HttpStatus.IM_A_TEAPOT)) {
    super(message, HttpStatus.IM_A_TEAPOT);
  }
}
export class MisdirectedRequestException extends HttpException {
  constructor(message: string | object | any = getReasonPhrase(HttpStatus.MISDIRECTED_REQUEST)) {
    super(message, HttpStatus.MISDIRECTED_REQUEST);
  }
}
export class UnprocessableEntityException extends HttpException {
  constructor(message: string | object | any = getReasonPhrase(HttpStatus.UNPROCESSABLE_ENTITY)) {
    super(message, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
export class LockedException extends HttpException {
  constructor(message: string | object | any = getReasonPhrase(HttpStatus.LOCKED)) {
    super(message, HttpStatus.LOCKED);
  }
}
export class FailedDependencyException extends HttpException {
  constructor(message: string | object | any = getReasonPhrase(HttpStatus.FAILED_DEPENDENCY)) {
    super(message, HttpStatus.FAILED_DEPENDENCY);
  }
}
export class PreconditionRequiredException extends HttpException {
  constructor(message: string | object | any = getReasonPhrase(HttpStatus.PRECONDITION_REQUIRED)) {
    super(message, HttpStatus.PRECONDITION_REQUIRED);
  }
}
export class TooManyRequestsException extends HttpException {
  constructor(message: string | object | any = getReasonPhrase(HttpStatus.TOO_MANY_REQUESTS)) {
    super(message, HttpStatus.TOO_MANY_REQUESTS);
  }
}
export class RequestHeaderFieldsTooLargeException extends HttpException {
  constructor(message: string | object | any = getReasonPhrase(HttpStatus.REQUEST_HEADER_FIELDS_TOO_LARGE)) {
    super(message, HttpStatus.REQUEST_HEADER_FIELDS_TOO_LARGE);
  }
}
export class UnavailableForLegalReasonsException extends HttpException {
  constructor(message: string | object | any = getReasonPhrase(HttpStatus.UNAVAILABLE_FOR_LEGAL_REASONS)) {
    super(message, HttpStatus.UNAVAILABLE_FOR_LEGAL_REASONS);
  }
}
export class InternalServerErrorException extends HttpException {
  constructor(message: string | object | any = getReasonPhrase(HttpStatus.INTERNAL_SERVER_ERROR)) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export class NotImplementedException extends HttpException {
  constructor(message: string | object | any = getReasonPhrase(HttpStatus.NOT_IMPLEMENTED)) {
    super(message, HttpStatus.NOT_IMPLEMENTED);
  }
}
export class BadGatewayException extends HttpException {
  constructor(message: string | object | any = getReasonPhrase(HttpStatus.BAD_GATEWAY)) {
    super(message, HttpStatus.BAD_GATEWAY);
  }
}
export class ServiceUnavailableException extends HttpException {
  constructor(message: string | object | any = getReasonPhrase(HttpStatus.SERVICE_UNAVAILABLE)) {
    super(message, HttpStatus.SERVICE_UNAVAILABLE);
  }
}
export class GatewayTimeoutException extends HttpException {
  constructor(message: string | object | any = getReasonPhrase(HttpStatus.GATEWAY_TIMEOUT)) {
    super(message, HttpStatus.GATEWAY_TIMEOUT);
  }
}
export class HttpVersionNotSupportedException extends HttpException {
  constructor(message: string | object | any = getReasonPhrase(HttpStatus.HTTP_VERSION_NOT_SUPPORTED)) {
    super(message, HttpStatus.HTTP_VERSION_NOT_SUPPORTED);
  }
}
export class InsufficientStorageException extends HttpException {
  constructor(message: string | object | any = getReasonPhrase(HttpStatus.INSUFFICIENT_STORAGE)) {
    super(message, HttpStatus.INSUFFICIENT_STORAGE);
  }
}
export class NetworkAuthenticationRequiredException extends HttpException {
  constructor(message: string | object | any = getReasonPhrase(HttpStatus.NETWORK_AUTHENTICATION_REQUIRED)) {
    super(message, HttpStatus.NETWORK_AUTHENTICATION_REQUIRED);
  }
}

export class CreateErrorException extends HttpException {
  constructor(message: string | object | any, status: HttpStatus) {
    super(message, status);
  }
}

export const isHttpException = (error: object | any) => {
  if (error instanceof HttpException) {
    return true;
  } else {
    return false;
  }
};
export { HttpStatus, getReasonPhrase };
