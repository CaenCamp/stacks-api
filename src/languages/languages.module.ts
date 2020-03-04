import { Module } from '@nestjs/common';
import { LanguagesController } from './languages.controller';
import { LanguagesService } from './languages.service';
import {DataModule} from '../data';

@Module({
  imports: [DataModule],
  controllers: [LanguagesController],
  providers: [LanguagesService],
})
export class LanguagesModule {}
