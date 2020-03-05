import { Injectable } from '@nestjs/common';
import { DataService } from './data.service';
import {RawLanguage, RawStack} from './model';
import { Observable } from 'rxjs';
import {filter, find, flatMap, map, toArray} from 'rxjs/operators';

export interface LanguagesFilters {
    languages?: string[];
}
@Injectable()
export class LanguagesRepository {
  constructor(private readonly dataService: DataService) {}

  findAll(filters?: LanguagesFilters): Observable<RawLanguage[]> {
    return this.dataService.languages$.pipe(
      flatMap((languages: RawLanguage[]) => languages),
      filter((language: RawLanguage) => LanguagesRepository.filters(language, filters)),
      toArray(),
    );
  }

  findOne(id: string): Observable<RawLanguage> {
      return this.dataService.languages$.pipe(
          flatMap((languages: RawLanguage[]) => languages),
          find((language: RawLanguage) => language.id === id),
      );
  }

  private static filters(language: RawLanguage, filters?: LanguagesFilters): boolean {
      if (filters == null) {
          return true;
      }
      let result = true;
      if (filters.languages != null) {
          result = result && filters.languages.includes(language.id);
      }
      return result;
  }
}
