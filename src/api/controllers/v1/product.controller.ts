import { Request, Response } from 'express';
import { controller, httpGet, Controller } from 'inversify-express-utils';
import {
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
} from '@common/utils/http-exception';
import { BaseController } from '@common/controllers';
import { ModelApiResponse, StatusCode } from '@common/utils/api-response';
import { validation } from '@api/middlewares/validation.middleware';
import { ProductParamReqDto } from '@application/dtos';

@controller('/products')
export class ProductController extends BaseController implements Controller {
  constructor() {
    super();
  }
  @httpGet('/', validation(ProductParamReqDto))
  public async get(req: Request, res: Response) {
    this.ok(res, {});

    this.result(res, StatusCode.MODEL_IS_NOT_VALID, HttpStatus.UNPROCESSABLE_ENTITY, null, null, [
      { message: '', property: '' } as ModelApiResponse,
    ]);
  }
  @httpGet('/get-all')
  public async getAll(req: Request, res: Response) {
    // throw new InternalServerErrorException();
    this.ok(res, { ruc: '121334234234234' });
  }
}
