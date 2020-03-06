import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { StacksService } from './stacks.service';
import { AppModule } from '../app.module';
import { DataModule } from '../data';

describe('Stacks', () => {
  let app: INestApplication;
  let stacksService: StacksService;
  let dataModule: DataModule;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    dataModule = module.get<DataModule>(DataModule);
    stacksService = module.get<StacksService>(StacksService);

    app = module.createNestApplication();
    await app.init();
  });

  it(`/GET stacks`, async () => {
    return request(app.getHttpServer())
      .get('/stacks')
      .expect(200)
      .expect(await stacksService.findAll().toPromise());
  });

  afterAll(async () => {
    await app.close();
  });
});
