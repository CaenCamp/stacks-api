import {Controller, Get, Param} from '@nestjs/common';
import {StacksService} from './stacks.service';
import {Stack} from './stack.interface';
import {ApiParam, ApiTags} from '@nestjs/swagger';
import {Observable} from 'rxjs';

@ApiTags('Stacks')
@Controller('stacks')
export class StacksController {
  constructor(private readonly stacksService: StacksService) {
  }

  @Get()
  findAll(): Observable<Stack[]> {
    return this.stacksService.findAll();
  }

  @Get(':id')
  @ApiParam({
    type: String,
    name: 'id',
  })
  findOne(@Param() {id}: { id: string }): Observable<Stack> {
    return this.stacksService.findOne(id);
  }

  @Get(':id/languages')
  @ApiParam({
    type: String,
    name: 'id',
  })
  findLanguagesOfOne(@Param() {id}: { id: string }): Observable<Stack> {
    return this.stacksService.findOne(id);
  }

  @Get(':id/categories')
  @ApiParam({
    type: String,
    name: 'id',
  })
  findCategoriesOfOne(@Param() {id}: { id: string }): Observable<Stack> {
    return this.stacksService.findOne(id);
  }
}
