import { HttpException, isHttpException, HttpStatus } from '@common/utils/http-exception';
import { NextFunction, Request, Response } from 'express';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (isHttpException(err)) {
    const error = err as HttpException;
    return res.status(error.status).json({
      status: error.status,
      message: error.message,
      stack: error.stack,
      timestamp: error.timestamp,
    });
  } else {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: err.message,
      stack: err.stack,
      timestamp: new Date().toISOString(),
    });
  }
};
