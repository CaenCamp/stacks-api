import {Controller, Get} from '@nestjs/common';
import {CategoriesService} from './categories.service';
import {Category} from './category.interface';
import {ApiBody, ApiTags} from '@nestjs/swagger';
import {Observable} from 'rxjs';
import {RawCategory} from '../data/model';
import {DataService} from '../data';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService, private readonly dataService: DataService) {
  }

  @Get()
  getAll(): Observable<RawCategory[]> {
    return this.dataService.loadCategories();
  }
}

// GET /categories
// GET /categories/<category>
// GET /categories/<category>/stacks
