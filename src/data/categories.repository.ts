import { Injectable } from '@nestjs/common';
import { DataService } from './data.service';
import { Observable } from 'rxjs';
import { Category } from './model';

@Injectable()
export class CategoriesRepository {
  constructor(private readonly dataService: DataService) {}

  findAll(): Observable<Category[]> {
    return this.dataService.categories$;
  }
}
