import { Controller, Get, Param } from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { LanguageDto, LanguageStackDto } from './dto';

@ApiTags('Languages')
@Controller('languages')
@ApiOkResponse()
@ApiNotFoundResponse()
@ApiInternalServerErrorResponse()
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}

  @Get()
  findAll(): Observable<LanguageDto[]> {
    return this.languagesService.findAll();
  }

  @Get(':id')
  @ApiParam({
    type: String,
    name: 'id',
  })
  findOne(@Param() { id }: { id: string }): Observable<LanguageDto> {
    return this.languagesService.findOne(id);
  }

  @Get(':id/stacks')
  @ApiParam({
    type: String,
    name: 'id',
  })
  findStacks(@Param() { id }: { id: string }): Observable<LanguageStackDto[]> {
    return this.languagesService.findStacks(id);
  }
}
