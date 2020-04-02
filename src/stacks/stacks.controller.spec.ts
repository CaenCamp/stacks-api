import { Test } from '@nestjs/testing';
import { StacksService } from './stacks.service';
import { StacksController } from './stacks.controller';
import { StackCategoryDto, StackDto, StackLanguageDto } from './dto';
import { of } from 'rxjs';
import { DataModule } from '../data';

describe('StacksController', () => {
  let stacksController: StacksController;
  let stacksService: StacksService;
  let dataModule: DataModule;

  const stack: StackDto = {
    id: 'nestjs',
    icon: '<unknown>',
    name: 'NestJS',
    source: 'https://github.com/nestjs/nest/',
    website: 'https://nestjs.com/',
  };
  const language: StackLanguageDto = {
    id: 'javascript',
    name: 'Javascript',
    website: 'https://developer.mozilla.org/docs/Web/JavaScript',
    icon: 'https://raw.githubusercontent.com/voodootikigod/logo.js/master/js.png',
  };
  const category: StackCategoryDto = {
    id: 'backend',
    name: 'BackEnd',
    summary: 'Lorem ispum dolor sit amet',
    icon: '<unknown>',
  };
  const id = 'reactjs';

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [DataModule],
      controllers: [StacksController],
      providers: [StacksService],
      exports: [StacksService],
    }).compile();
    dataModule = module.get<DataModule>(DataModule);
    stacksService = module.get<StacksService>(StacksService);
    stacksController = module.get<StacksController>(StacksController);
  });

  describe('findAll', () => {
    it('should return an array of stacks', done => {
      const result: StackDto[] = [stack];
      jest.spyOn(stacksService, 'findAll').mockImplementation(() => of(result));
      stacksController.findAll().subscribe(res => {
        expect(res).toBe(result);
        done();
      });
    });
  });

  describe('findOne', () => {
    it('should return a stack', done => {
      const result: StackDto = stack;
      jest.spyOn(stacksService, 'findOne').mockImplementation(() => of(result));
      stacksController.findOne({ id }).subscribe(res => {
        expect(res).toBe(result);
        done();
      });
    });
  });

  describe('findLanguagesOfOne', () => {
    it(`should return an array of languages for a specific stack`, done => {
      const result: StackLanguageDto[] = [language];
      jest.spyOn(stacksService, 'findLanguages').mockImplementation(() => of(result));
      stacksController.findLanguagesOfOne({ id }).subscribe(res => {
        expect(res).toBe(result);
        done();
      });
    });
  });

  describe('findCategoriesOfOne', () => {
    it('should return an array of categories for a specific stack', done => {
      const result: StackCategoryDto[] = [category];
      jest.spyOn(stacksService, 'findCategories').mockImplementation(() => of(result));
      stacksController.findCategoriesOfOne({ id }).subscribe(res => {
        expect(res).toBe(result);
        done();
      });
    });
  });
});
