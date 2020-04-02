import { Injectable } from '@nestjs/common';
import { SearchDto, SearchLanguageDto, SearchStackDto } from './dto';
import { Language, LanguagesRepository, Stack, StacksRepository } from '../data';
import { Observable, throwError, zip } from 'rxjs';
import { catchError, flatMap, map, toArray } from 'rxjs/operators';

@Injectable()
export class SearchService {
  constructor(
    private readonly stacksRepository: StacksRepository,
    private readonly languagesRepository: LanguagesRepository,
  ) {}

  public search(query: string): Observable<SearchDto> {
    return zip(
      this.stacksRepository.findAll({ query }).pipe(
        flatMap((stacks: Stack[]) => stacks),
        map((stack: Stack) => SearchService.getStackDto(stack)),
        toArray(),
        catchError((error: Error) => throwError(error)),
      ),
      this.languagesRepository.findAll({ query }).pipe(
        flatMap((languages: Language[]) => languages),
        map((language: Language) => SearchService.getLanguageDto(language)),
        toArray(),
        catchError((error: Error) => throwError(error)),
      ),
    ).pipe(flatMap((results: Array<SearchStackDto[] | SearchLanguageDto[]>) => results));
  }

  private static getLanguageDto(language: Language): SearchLanguageDto {
    const { name, icon, url, id } = language;
    return new SearchLanguageDto(id, icon, name, url);
  }

  private static getStackDto(stack: Stack): SearchStackDto {
    const { icon, id, name, source, website } = stack;
    return new SearchStackDto(id, icon, name, source, website);
  }
}
