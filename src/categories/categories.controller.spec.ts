import { Test } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { CategoryDto, CategoryStackDto } from './dto';
import { of } from 'rxjs';
import { DataModule } from '../data';
import { StackCategoryDto } from '../stacks/dto';

describe('CategoriesController', () => {
  let categoriesController: CategoriesController;
  let categoriesService: CategoriesService;
  let dataModule: DataModule;

  const category: CategoryDto = {
    id: 'backend',
    name: 'BackEnd',
    summary: 'Lorem ispum dolor sit amet',
    icon: '<unknown>',
  };
  const stack: CategoryStackDto = {
    id: 'nestjs',
    icon: '<unknown>',
    name: 'NestJS',
    source: 'https://github.com/nestjs/nest/',
    website: 'https://nestjs.com/',
  };
  const id = 'web';

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [DataModule],
      controllers: [CategoriesController],
      providers: [CategoriesService],
      exports: [CategoriesService],
    }).compile();
    dataModule = module.get<DataModule>(DataModule);
    categoriesService = module.get<CategoriesService>(CategoriesService);
    categoriesController = module.get<CategoriesController>(CategoriesController);
  });

  describe('findAll', () => {
    it('should return an array of categories', done => {
      const result: CategoryDto[] = [category];
      jest.spyOn(categoriesService, 'findAll').mockImplementation(() => of(result));
      categoriesController.findAll().subscribe(res => {
        expect(res).toBe(result);
        done();
      });
    });
  });

  describe('findOne', () => {
    it('should return a stack', done => {
      const result: CategoryDto = category;
      jest.spyOn(categoriesService, 'findOne').mockImplementation(() => of(result));
      categoriesController.findOne({ id }).subscribe(res => {
        expect(res).toBe(result);
        done();
      });
    });
  });

  describe('findCategories', () => {
    it(`should return an array of categories for a specific language`, done => {
      const result: CategoryStackDto[] = [stack];
      jest.spyOn(categoriesService, 'findStacks').mockImplementation(() => of(result));
      categoriesController.findStacks({ id }).subscribe(res => {
        expect(res).toBe(result);
        done();
      });
    });
  });
});
