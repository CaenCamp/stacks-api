import {Controller, Get, Param} from '@nestjs/common';
import {LanguagesService} from './languages.service';
import {ApiParam, ApiTags} from '@nestjs/swagger';
import {Observable} from 'rxjs';
import {Language} from './language.interface';
import {RawStack} from '../data/model';

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
  findStacks(@Param() {id}: {id: string}): Observable<RawStack[]> {
    return this.languagesService.findStacks(id);
  }
}
