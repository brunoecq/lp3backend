import { Request, Response, NextFunction } from 'express';
import { HEADER } from '@common/constants';
import { CreateApiResponse, HttpStatus, StatusCode } from '@common/utils';
import { environment } from '@common/config/environment';
export const validateHeaders = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const errorsHeaders: any = [];
    const healthy = `${environment.basePath}/status/health`;
    if (req.path !== healthy && req.method !== 'OPTIONS' && req.path != environment.basePathSwagger) {
      if (req.headers[HEADER.COUNTRY] === undefined) {
        errorsHeaders.push({
          param: HEADER.COUNTRY,
          value: `header ${HEADER.COUNTRY} no sent`,
        });
      }
      if (req.headers[HEADER.COMMERCE] === undefined) {
        errorsHeaders.push({
          param: HEADER.COMMERCE,
          value: `header ${HEADER.COMMERCE} no sent`,
        });
      }
      if (req.headers[HEADER.USER] === undefined) {
        errorsHeaders.push({
          param: HEADER.USER,
          value: `header ${HEADER.USER} no sent`,
        });
      }
    }
    if (errorsHeaders.length > 0) {
      return new CreateApiResponse(StatusCode.FAILURE, HttpStatus.BAD_REQUEST, errorsHeaders).send(res);
    }
    await next();
  };
};
