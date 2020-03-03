import { Injectable } from '@nestjs/common';
import { Category } from './category.interface';

@Injectable()
export class CategoriesService {

  async findAll(): Promise<Category[]> {
    return [];
  }
}
