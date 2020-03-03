import { Injectable } from '@nestjs/common';
import { Language } from './language.interface';

@Injectable()
export class LanguagesService {

  async findAll(): Promise<Language[]> {
    return [];
  }
}
