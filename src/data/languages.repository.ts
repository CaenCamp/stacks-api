import { Injectable } from '@nestjs/common';
import { Language } from './model';
import { Observable } from 'rxjs';
import { filter, first, flatMap, toArray } from 'rxjs/operators';
import { DataService } from './data.service';

export interface LanguagesFilters {
  languages?: string[];
  query?: string;
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
    if (filters.query != null) {
      const query = filters.query.toLowerCase();
      const name = language.name.toLowerCase();
      const aliases = language.aliases?.map(alias => alias.toLowerCase());
      const nameMatch: boolean = name.includes(query);
      const aliasesMatch: string[] = aliases?.filter(alias => alias.includes(query)) || [];
      result = result && (nameMatch || aliasesMatch.length > 0);
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
