import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { Category } from './category.interface';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getAll(): Observable<Category[]> {
    return this.categoriesService.findAll();
  }
}

// GET /categories
// GET /categories/<category>
// GET /categories/<category>/stacks
