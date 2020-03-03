import { Module } from '@nestjs/common';
import { StacksModule } from './stacks';
import { LanguagesModule } from './languages';
import { CategoriesModule } from './categories';

@Module({
  imports: [
    StacksModule,
    LanguagesModule,
    CategoriesModule,
  ],

})
export class AppModule {
}
