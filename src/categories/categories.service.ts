import { Injectable } from '@nestjs/common';
import { Category } from './category.interface';
import { CategoriesRepository } from '../data';
import { Observable } from 'rxjs';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  findAll(): Observable<Category[]> {
    return this.categoriesRepository.findAll();
  }
}
