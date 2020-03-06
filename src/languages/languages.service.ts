import {HttpException, Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import {LanguageDto, LanguageStackDto} from './dto';
import {Language, LanguagesRepository, Stack, StacksRepository} from '../data';
import {Observable} from 'rxjs';
import {catchError, flatMap, map, toArray} from 'rxjs/operators';

@Injectable()
export class LanguagesService {
  constructor(
    private readonly languagesRepository: LanguagesRepository,
    private readonly stacksRepository: StacksRepository,
  ) {}

  private NOT_FOUND_ERROR = 'EmptyError';

  public findAll(): Observable<Language[]> {
    return this.languagesRepository.findAll().pipe(
      flatMap((languages: Language[]) => languages),
      map((language: Language) => LanguagesService.getLanguageDto(language)),
      toArray(),
      catchError((error: Error) => {
        throw this.handleError(error);
      }),
    );
  }

  public findOne(id: string): Observable<LanguageDto> {
    return this.languagesRepository.findOne(id).pipe(
      map((language: Language) => LanguagesService.getLanguageDto(language)),
      catchError((error: Error) => {
        throw this.handleError(error, id);
      }),
    );
  }

  public findStacks(id: string): Observable<LanguageStackDto[]> {
    return this.languagesRepository.findOne(id).pipe(
      flatMap((language: Language) =>
        this.stacksRepository.findAll({
          languages: [language.id],
        }),
      ),
      flatMap((stacks: Stack[]) => stacks),
      map((stack: Stack) => LanguagesService.getStackDto(stack)),
      toArray(),
      catchError((error: Error) => {
        throw this.handleError(error, id);
      }),
    );
  }

  private handleError(error: Error, id?: string): HttpException {
    if (error.name === this.NOT_FOUND_ERROR) {
      return new NotFoundException(`Language "${id}" was not found`);
    }
    return new InternalServerErrorException(error);
  }

  private static getStackDto(stack: Stack): LanguageStackDto {
    const { id, icon, name, source, website } = stack;
    return new LanguageStackDto(id, icon, name, source, website);
  }

  private static getLanguageDto(language: Language): LanguageDto {
    const { icon, id, name, url } = language;
    return new LanguageDto(id, icon, name, url);
  }
}
