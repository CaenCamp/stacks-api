import { Module } from '@nestjs/common';
import { StacksModule } from './stacks';
import { LanguagesModule } from './languages';
import { CategoriesModule } from './categories';
import { SearchModule } from './search';

@Module({
  imports: [StacksModule, LanguagesModule, CategoriesModule, SearchModule],
})
export class AppModule {}
