import { Controller, Get, Param } from '@nestjs/common';
import { StacksService } from './stacks.service';
import { StackDto } from './dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';

@ApiTags('Stacks')
@Controller('stacks')
export class StacksController {
  constructor(private readonly stacksService: StacksService) {}

  @Get()
  findAll(): Observable<StackDto[]> {
    return this.stacksService.findAll();
  }

  @Get(':id')
  @ApiParam({
    type: String,
    name: 'id',
  })
  findOne(@Param() { id }: { id: string }): Observable<StackDto> {
    return this.stacksService.findOne(id);
  }

  @Get(':id/languages')
  @ApiParam({
    type: String,
    name: 'id',
  })
  findLanguagesOfOne(@Param() { id }: { id: string }): Observable<StackDto> {
    return this.stacksService.findOne(id);
  }

  @Get(':id/categories')
  @ApiParam({
    type: String,
    name: 'id',
  })
  findCategoriesOfOne(@Param() { id }: { id: string }): Observable<StackDto> {
    return this.stacksService.findOne(id);
  }
}
