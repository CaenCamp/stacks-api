import { Controller, Get } from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { Language } from './language.interface';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Languages')
@Controller('languages')
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {
  }

  @Get()
  async findAll(): Promise<Language[]> {
    return this.languagesService.findAll();
  }
}
// GET /languages
// GET /languages/<language>
// GET /languages/<language>/stacks
