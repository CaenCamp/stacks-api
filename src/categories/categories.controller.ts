import {Controller, Get, Param} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import {ApiParam, ApiTags} from '@nestjs/swagger';
import { Observable } from 'rxjs';
import {CategoryDto, CategoryStackDto} from './dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  findAll(): Observable<CategoryDto[]> {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @ApiParam({
    type: String,
    name: 'id',
  })
  findOne(@Param() { id }: { id: string }): Observable<CategoryDto> {
    return this.categoriesService.findOne(id);
  }

  @Get(':id/stacks')
  @ApiParam({
    type: String,
    name: 'id',
  })
  findStacks(@Param() { id }: { id: string }): Observable<CategoryStackDto[]> {
    return this.categoriesService.findStacks(id);
  }
}
