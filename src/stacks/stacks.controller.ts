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
  findAll(): Promise<Stack[]> {
    return this.stacksService.findAll();
  }

  @Get(':id')
  findOne(id: string): Promise<Stack> {
    return this.stacksService.findOne(id);
  }

  @Get(':id/languages')
  findLanguagesOfOne(id: string): Promise<Stack> {
    return this.stacksService.findOne(id);
  }

  @Get(':id/categories')
  findCategoriesOfOne(id: string): Promise<Stack> {
    return this.stacksService.findOne(id);
  }
}
