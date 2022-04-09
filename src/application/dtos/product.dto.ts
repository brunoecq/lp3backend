import { IsNotEmpty } from 'class-validator';

export class ProductParamReqDto {
  @IsNotEmpty({ message: 'código es requerido' })
  code?: string;
}
