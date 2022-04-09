import { ProductContract } from '@domain/interfaces/services';
import { injectable } from 'inversify';

@injectable()
export class ProductService implements ProductContract {
  getAll(): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
