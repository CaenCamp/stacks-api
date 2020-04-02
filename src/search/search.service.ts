import { Injectable } from '@nestjs/common';
import { SearchDto } from './dto';
import { Language, LanguagesRepository, Stack, StacksRepository } from '../data';
import { Observable, throwError, zip } from 'rxjs';
import { catchError, flatMap, map, mergeMap, toArray } from 'rxjs/operators';

@Injectable()
export class SearchService {
  constructor(
    private readonly stacksRepository: StacksRepository,
    private readonly languagesRepository: LanguagesRepository,
  ) {}

  public search(query: string): Observable<SearchDto[]> {
    return zip(this.searchStacks(query), this.searchLanguages(query)).pipe(
      flatMap((results: Array<SearchDto[] | SearchDto[]>) => results),
      mergeMap((results: SearchDto[] | SearchDto[]) => results),
      toArray(),
    );
  }

  public searchStacks(query: string): Observable<SearchDto[]> {
    return this.stacksRepository.findAll({ query }).pipe(
      flatMap((stacks: Stack[]) => stacks),
      map((stack: Stack) => SearchService.getSearchDto(stack)),
      toArray(),
      catchError((error: Error) => throwError(error)),
    );
  }

  public searchLanguages(query: string): Observable<SearchDto[]> {
    return this.languagesRepository.findAll({ query }).pipe(
      flatMap((languages: Language[]) => languages),
      map((language: Language) => SearchService.getSearchDto(language)),
      toArray(),
      catchError((error: Error) => throwError(error)),
    );
  }

  private static getSearchDto(data: Stack | Language): SearchDto {
    const { icon, id, name, website } = data;
    return new SearchDto(id, icon, name, website, data.constructor.name.toLowerCase());
  }
}
