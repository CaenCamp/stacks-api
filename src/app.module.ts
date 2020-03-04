import {Module} from '@nestjs/common';
import {StacksModule} from './stacks';
import {LanguagesModule} from './languages';
import {CategoriesModule} from './categories';
import {DataModule} from './data';

@Module({
  imports: [
    StacksModule,
    LanguagesModule,
    CategoriesModule,
    DataModule,
  ],
})
export class AppModule {
}
