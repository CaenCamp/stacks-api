import { Module } from '@nestjs/common';
import { DataLoader } from './data.loader';
import { CategoriesRepository } from './categories.repository';
import { LanguagesRepository } from './languages.repository';
import { StacksRepository } from './stacks.repository';
import { DataService } from './data.service';
import { zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category, Language, Stack } from './model';

@Module({
  imports: [],
  providers: [
    DataLoader,
    CategoriesRepository,
    LanguagesRepository,
    StacksRepository,
    {
      provide: DataService,
      useFactory: async (dataService: DataLoader) => {
        return await zip(dataService.loadStacks(), dataService.loadLanguages(), dataService.loadCategories())
          .pipe(
            map(
              ([stacks, languages, categories]: [Stack[], Language[], Category[]]) =>
                new DataService(stacks, languages, categories),
            ),
          )
          .toPromise();
      },
      inject: [DataLoader],
    },
  ],
  exports: [CategoriesRepository, LanguagesRepository, StacksRepository],
})
export class DataModule {}
