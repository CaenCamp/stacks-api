import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { StacksService } from './stacks.service';
import { AppModule } from '../app.module';
import { DataModule } from '../data';
import { of } from 'rxjs';
import { StackDto } from './dto';

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
    jest
      .spyOn(stacksService, 'findAll')
      .mockImplementation(() =>
        of([
          new StackDto('koajs', '<unknown>', 'KoaJS', 'https://github.com/koajs/koa', 'https://koajs.com/'),
          new StackDto(
            'angularsjs',
            '<unknown>',
            'AngularJS',
            'https://github.com/angular/angular.js/',
            'https://angularjs.org/',
          ),
          new StackDto(
            'angulars',
            '<unknown>',
            'Angular',
            'https://github.com/angular/angular/',
            'https://angular.io/',
          ),
        ]),
      );
    return request(app.getHttpServer())
      .get('/stacks')
      .expect(200)
      .expect([
        {
          id: 'koajs',
          icon: '<unknown>',
          name: 'KoaJS',
          source: 'https://github.com/koajs/koa',
          website: 'https://koajs.com/',
        },
        {
          id: 'angularsjs',
          icon: '<unknown>',
          name: 'AngularJS',
          source: 'https://github.com/angular/angular.js/',
          website: 'https://angularjs.org/',
        },
        {
          id: 'angulars',
          icon: '<unknown>',
          name: 'Angular',
          source: 'https://github.com/angular/angular/',
          website: 'https://angular.io/',
        },
      ]);
  });

  afterAll(async () => {
    await app.close();
  });
});
