import { Test, TestingModule } from '@nestjs/testing';
import { CATEGORIES, DataLoader, LANGUAGES, STACKS } from './data.loader';
import { flatMap } from 'rxjs/operators';
import { Stack } from './model';
import { fileExistsSync } from 'tsconfig-paths/lib/filesystem';

describe('DataLoader', () => {
  let service: DataLoader;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataLoader],
    }).compile();
    service = module.get<DataLoader>(DataLoader);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it.each([STACKS, CATEGORIES, LANGUAGES])(`should have only yaml in %s folder`, name => {
    service.readDataFolder(name).subscribe({
      next: (file: string) => {
        expect(file.endsWith('.yaml')).toBeTruthy();
      },
      // complete: () => done(),
    });
  });
  it('stacks should have associated categories', done => {
    service
      .loadStacks()
      .pipe(flatMap(stacks => stacks))
      .subscribe({
        next: (stack: Stack) => {
          stack.categories.forEach(category => {
            const exists = fileExistsSync(`${service.dataFolderPath}/${CATEGORIES}/${category}.yaml`);
            expect(exists, `${stack.name} has a category '${category}' that does not exist`).toBeTruthy();
          });
        },
        complete: () => done(),
      });
  });
  it('stacks should have associated languages', done => {
    service
      .loadStacks()
      .pipe(flatMap(stacks => stacks))
      .subscribe({
        next: (stack: Stack) => {
          stack.languages.forEach(language => {
            const exists = fileExistsSync(`${service.dataFolderPath}/${LANGUAGES}/${language}.yaml`);
            expect(exists, `${stack.name} has a language '${language}' that does not exist`).toBeTruthy();
          });
        },
        complete: () => done(),
      });
  });
});
