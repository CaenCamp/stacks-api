import { Controller, Get } from '@nestjs/common';
import { StacksService } from './stacks.service';
import { Stack } from './stack.interface';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Stacks')
@Controller('stacks')
export class StacksController {
  constructor(private readonly stacksService: StacksService) {
  }

  @Get()
  @ApiBody({
    description: 'List of stacks',
  })
  findAll(): Promise<Stack[]> {
    return this.stacksService.findAll();
  }

  @Get(':id')
  @ApiBody({
    description: 'Detail of one stack',
  })
  findOne(id: string): Promise<Stack> {
    return this.stacksService.findOne(id);
  }

  @Get(':id/languages')
  @ApiBody({
    description: 'Stack\'s languages',
  })
  findLanguagesOfOne(id: string): Promise<Stack> {
    return this.stacksService.findOne(id);
  }

  @Get(':id/categories')
  @ApiBody({
    description: 'Stack\'s categories',
  })
  findCategoriesOfOne(id: string): Promise<Stack> {
    return this.stacksService.findOne(id);
  }
}
