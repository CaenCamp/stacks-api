import { Injectable } from '@nestjs/common';
import { Category } from './model';
import { Observable } from 'rxjs';
import { filter, first, flatMap, toArray } from 'rxjs/operators';
import { DataService } from './data.service';

export interface CategoriesFilters {
  categories?: string[];
}

@Injectable()
export class CategoriesRepository {
  constructor(private readonly dataRepository: DataService) {}

  private static filters(category: Category, filters?: CategoriesFilters): boolean {
    if (filters == null) {
      return true;
    }
    let result = true;
    if (filters.categories != null) {
      result = result && filters.categories.includes(category.id);
    }
    return result;
  }

  findAll(filters?: CategoriesFilters): Observable<Category[]> {
    return this.dataRepository.categories$.pipe(
      flatMap((categories: Category[]) => categories),
      filter((category: Category) => CategoriesRepository.filters(category, filters)),
      toArray(),
    );
  }

  findOne(id: string): Observable<Category> {
    return this.dataRepository.categories$.pipe(
      flatMap((categories: Category[]) => categories),
      first((category: Category) => category.id === id),
    );
  }
}
