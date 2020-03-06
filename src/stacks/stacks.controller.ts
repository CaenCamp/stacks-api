import {Controller, Get, InternalServerErrorException, NotFoundException, Param} from '@nestjs/common';
import {StacksService} from './stacks.service';
import {StackCategoryDto, StackDto, StackLanguageDto} from './dto';
import {ApiParam, ApiTags} from '@nestjs/swagger';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

@ApiTags('Stacks')
@Controller('stacks')
export class StacksController {
  constructor(private readonly stacksService: StacksService) {}

  private NOT_FOUND_ERROR = 'EmptyError';

  @Get()
  findAll(): Observable<StackDto[]> {
    return this.stacksService.findAll().pipe(
      catchError((error: Error) => {
        throw new InternalServerErrorException();
      }),
    );
  }

  @Get(':id')
  @ApiParam({
    type: String,
    name: 'id',
  })
  findOne(@Param() { id }: { id: string }): Observable<StackDto> {
    return this.stacksService.findOne(id).pipe(
      catchError((error: Error) => {
        if (error.name === this.NOT_FOUND_ERROR) {
          throw new NotFoundException();
        }
        throw new InternalServerErrorException();
      }),
    );
  }

  @Get(':id/languages')
  @ApiParam({
    type: String,
    name: 'id',
  })
  findLanguagesOfOne(@Param() { id }: { id: string }): Observable<StackLanguageDto[]> {
    return this.stacksService.findLanguages(id).pipe(
      catchError((error: Error) => {
        if (error.name === this.NOT_FOUND_ERROR) {
          throw new NotFoundException();
        }
        throw new InternalServerErrorException();
      }),
    );
  }

  @Get(':id/categories')
  @ApiParam({
    type: String,
    name: 'id',
  })
  findCategoriesOfOne(@Param() { id }: { id: string }): Observable<StackCategoryDto[]> {
    return this.stacksService.findCategories(id).pipe(
      catchError((error: Error) => {
        if (error.name === this.NOT_FOUND_ERROR) {
          throw new NotFoundException();
        }
        throw new InternalServerErrorException();
      }),
    );
  }
}
