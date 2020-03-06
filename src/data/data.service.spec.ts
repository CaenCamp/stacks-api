import { Test, TestingModule } from '@nestjs/testing';
import { CATEGORIES, DataService, LANGUAGES, STACKS } from './data.service';

describe('DataService', () => {
  let service: DataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataService],
    }).compile();

    service = module.get<DataService>(DataService);
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
