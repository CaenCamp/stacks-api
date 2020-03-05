import { Injectable } from '@nestjs/common';
import { DataService } from './data.service';
import { Observable } from 'rxjs';
import { RawCategory } from './model';

@Injectable()
export class CategoriesRepository {
  constructor(private readonly dataService: DataService) {}

  findAll(): Observable<RawCategory[]> {
    return this.dataService.categories$;
  }
}
