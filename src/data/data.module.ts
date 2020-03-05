import { Module } from '@nestjs/common';
import { DataService } from './data.service';
import { CategoriesRepository } from './categories.repository';
import { LanguagesRepository } from './languages.repository';
import { StacksRepository } from './stacks.repository';

@Module({
  imports: [],
  providers: [DataService, CategoriesRepository, LanguagesRepository, StacksRepository],
  exports: [CategoriesRepository, LanguagesRepository, StacksRepository],
})
export class DataModule {}
