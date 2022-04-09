import { Container } from 'inversify';
import { interfaces, TYPE } from 'inversify-express-utils';
import * as controller from '@api/controllers';
import * as services from '@application/services';
import * as repository from '@infrastructure/repository';
import * as contractServices from '@domain/interfaces/services';
import * as contractRepository from '@domain/interfaces/repository';
import { TYPES } from '@common/constants/di-types';

export class AppContainer {
  container = new Container();
  constructor() {
    this.configure();
  }
  configure() {
    //this.configureControllers();
    //this.configureServices();
    //this.configureRepository();
  }
  configureControllers() {
    (<any>Object).values(controller).map((ctrl: any) => {
      this.container.bind<interfaces.Controller>(TYPE.Controller);
    });
  }
  configureServices() {
    this.container.bind<contractServices.ProductContract>(TYPES.ProductService).to(services.ProductService);
  }
  configureRepository() {
    this.container.bind<contractRepository.ProductContract>(TYPES.ProducRepository).to(repository.ProductRepository);
  }
}
