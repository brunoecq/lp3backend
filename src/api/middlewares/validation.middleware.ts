/* eslint-disable max-len */
import { Request, Response, NextFunction } from 'express';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { CreateApiResponse, StatusCode, HttpStatus } from '@common/utils/api-response';

const validateObject = async (object: any, skipMissingProperties = false): Promise<Array<any>> => {
  const errors: ValidationError[] = await validate(object, { skipMissingProperties });
  const result: Array<any> = [];
  if (errors.length > 0) {
    errors.forEach((e: ValidationError) => {
      const constraints = Object.values(e.constraints || {});
      constraints.forEach((v) => {
        result.push({ message: v, property: e.property });
      });
    });
  }
  return result;
};

export function validation<T>(object: new () => T, skipMissingProperties = false) {
  return async (req: Request, res: Response, next: NextFunction) => {
    let errorQuery = [];
    let errorBody = [];
    if (req.query && req.method == 'GET') {
      errorQuery = await validateObject(plainToClass(object, req.query), skipMissingProperties);
    }
    if (Object.keys(req.body).length) {
      errorBody = await validateObject(plainToClass(object, req.body), skipMissingProperties);
    }
    if (errorQuery.length | errorBody.length) {
      return new CreateApiResponse(StatusCode.MODEL_IS_NOT_VALID, HttpStatus.UNPROCESSABLE_ENTITY, null, null, [
        ...errorBody,
        ...errorQuery,
      ]).send(res);
    } else {
      await next();
    }
  };
}
