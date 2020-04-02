import { Test } from '@nestjs/testing';
import { LanguagesService } from './languages.service';
import { LanguagesController } from './languages.controller';
import { LanguageDto, LanguageStackDto } from './dto';
import { of } from 'rxjs';
import { DataModule } from '../data';

describe('LanguagesController', () => {
  let languagesController: LanguagesController;
  let languagesService: LanguagesService;
  let dataModule: DataModule;

  const language: LanguageDto = {
    id: 'javascript',
    name: 'Javascript',
    website: 'https://developer.mozilla.org/docs/Web/JavaScript',
    icon: 'https://raw.githubusercontent.com/voodootikigod/logo.js/master/js.png',
  };

  const stack: LanguageStackDto = {
    id: 'nestjs',
    icon: '<unknown>',
    name: 'NestJS',
    source: 'https://github.com/nestjs/nest/',
    website: 'https://nestjs.com/',
  };
  const id = 'javascript';

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [DataModule],
      controllers: [LanguagesController],
      providers: [LanguagesService],
      exports: [LanguagesService],
    }).compile();
    dataModule = module.get<DataModule>(DataModule);
    languagesService = module.get<LanguagesService>(LanguagesService);
    languagesController = module.get<LanguagesController>(LanguagesController);
  });

  describe('findAll', () => {
    it('should return an array of languages', done => {
      const result: LanguageDto[] = [language];
      jest.spyOn(languagesService, 'findAll').mockImplementation(() => of(result));
      languagesController.findAll().subscribe(res => {
        expect(res).toBe(result);
        done();
      });
    });
  });

  describe('findOne', () => {
    it('should return a stack', done => {
      const result: LanguageDto = language;
      jest.spyOn(languagesService, 'findOne').mockImplementation(() => of(result));
      languagesController.findOne({ id }).subscribe(res => {
        expect(res).toBe(result);
        done();
      });
    });
  });

  describe('findLanguages', () => {
    it(`should return an array of languages for a specific language`, done => {
      const result: LanguageStackDto[] = [stack];
      jest.spyOn(languagesService, 'findStacks').mockImplementation(() => of(result));
      languagesController.findStacks({ id }).subscribe(res => {
        expect(res).toBe(result);
        done();
      });
    });
  });
});
