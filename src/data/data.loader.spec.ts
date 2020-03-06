import { Test, TestingModule } from '@nestjs/testing';
import { CATEGORIES, DataLoader, LANGUAGES, STACKS } from './data.loader';

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
  [STACKS, CATEGORIES, LANGUAGES].forEach(name =>
    it(`should have only yaml in ${name} folder`, done => {
      service.readDataFolder(name).subscribe({
        next: (file: string) => {
          expect(file.endsWith('.yaml')).toBeTruthy();
        },
        complete: () => done(),
      });
    }),
  );
});
