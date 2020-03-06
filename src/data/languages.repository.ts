import {Injectable} from '@nestjs/common';
import {Language} from './model';
import {Observable} from 'rxjs';
import {filter, first, flatMap, toArray} from 'rxjs/operators';
import {DataService} from './data.service';

export interface LanguagesFilters {
  languages?: string[];
}

@Injectable()
export class LanguagesRepository {
  constructor(private readonly dataRepository: DataService) {}

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
    return this.dataRepository.languages$.pipe(
      flatMap((languages: Language[]) => languages),
      filter((language: Language) => LanguagesRepository.filters(language, filters)),
      toArray(),
    );
  }

  findOne(id: string): Observable<Language> {
    return this.dataRepository.languages$.pipe(
      flatMap((languages: Language[]) => languages),
      first((language: Language) => language.id === id),
    );
  }
}
