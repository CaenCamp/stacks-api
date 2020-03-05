import {Controller, Get, Param} from '@nestjs/common';
import {LanguagesService} from './languages.service';
import {ApiParam, ApiTags} from '@nestjs/swagger';
import {Observable} from 'rxjs';
import {Language} from './dto/language.dto';
import {RawStack} from '../data/model';
import {LanguageStack} from './dto';

@ApiTags('Languages')
@Controller('languages')
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {
  }

  @Get()
  findAll(): Observable<Language[]> {
    return this.languagesService.findAll();
  }

  @Get(':id')
  @ApiParam({
    type: String,
    name: 'id',
  })
  findOne(@Param() {id}: {id: string}): Observable<Language> {
    return this.languagesService.findOne(id);
  }

  @Get(':id/stacks')
  @ApiParam({
    type: String,
    name: 'id',
  })
  findStacks(@Param() {id}: {id: string}): Observable<LanguageStack[]> {
    return this.languagesService.findStacks(id);
  }
}
