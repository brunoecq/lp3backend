import { ProductContract } from '@domain/interfaces/repository';

export class ProductRepository implements ProductContract {
  getAll(): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
