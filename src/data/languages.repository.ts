import { Injectable } from '@nestjs/common';
import { DataService } from './data.service';
import { Language } from './model';
import { Observable } from 'rxjs';
import { filter, find, flatMap, toArray } from 'rxjs/operators';

export interface LanguagesFilters {
  languages?: string[];
}

@Injectable()
export class LanguagesRepository {
  constructor(private readonly dataService: DataService) {}

  private static filters(language: Language, filters?: LanguagesFilters): boolean {
    if (filters == null) {
      return true;
    }
    let result = true;
    if (filters.languages != null) {
      result = result && filters.languages.includes(language.id);
    }
    return result;
  }

  findAll(filters?: LanguagesFilters): Observable<Language[]> {
    return this.dataService.languages$.pipe(
      flatMap((languages: Language[]) => languages),
      filter((language: Language) => LanguagesRepository.filters(language, filters)),
      toArray(),
    );
  }

  findOne(id: string): Observable<Language> {
    return this.dataService.languages$.pipe(
      flatMap((languages: Language[]) => languages),
      find((language: Language) => language.id === id),
    );
  }
}
