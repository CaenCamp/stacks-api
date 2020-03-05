import { HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { StackCategoryDto, StackDto, StackLanguageDto } from './dto';
import { LanguagesRepository, Category, Language, Stack, StacksRepository, CategoriesRepository } from '../data';
import { Observable } from 'rxjs';
import { catchError, flatMap, map, toArray } from 'rxjs/operators';

@Injectable()
export class StacksService {
  constructor(
    private readonly stacksRepository: StacksRepository,
    private readonly languagesRepository: LanguagesRepository,
    private readonly categoriesRepository: CategoriesRepository,
  ) {}

  private NOT_FOUND_ERROR = 'EmptyError';

  public findAll(): Observable<StackDto[]> {
    return this.stacksRepository.findAll().pipe(
      flatMap((stacks: Stack[]) => stacks),
      flatMap((stack: Stack) => this.stackLanguages$(stack)),
      toArray(),
      catchError(error => {
        throw this.handleError(error);
      }),
    );
  }

  public findOne(id: string): Observable<StackDto> {
    return this.stacksRepository.findOne(id).pipe(
      flatMap((stack: Stack) => this.stackLanguages$(stack)),
      catchError(error => {
        throw this.handleError(error, id);
      }),
    );
  }

  public findLanguages(id: string): Observable<StackLanguageDto[]> {
    return this.stacksRepository.findOne(id).pipe(
      flatMap((stack: Stack) => this.stackLanguages$(stack)),
      map((stack: StackDto) => stack.languages),
      catchError((error: Error) => {
        throw this.handleError(error, id);
      }),
    );
  }

  private handleError(error: Error, id?: string): HttpException {
    if (error.name === this.NOT_FOUND_ERROR) {
      return new NotFoundException(`Stack "${id}" was not found`);
    }
    return new InternalServerErrorException(error);
  }

  private static getLanguageDto(language: Language): StackLanguageDto {
    const { name, icon, url, id } = language;
    return new StackLanguageDto(id, icon, name, url);
  }

  private static getCategoryDto(category: Category): StackCategoryDto {
    const { name, id, icon, summary } = category;
    return new StackCategoryDto(id, icon, name, summary);
  }

  private stackLanguages$(stack: Stack): Observable<StackDto> {
    return this.languagesRepository
      .findAll({ languages: stack.languages })
      .pipe(map((languages: Language[]) => this.getStackDto(stack, languages, [])));
  }

  private stackCategories$(stack: Stack): Observable<StackDto> {
    return this.categoriesRepository
      .findAll({ categories: stack.categories })
      .pipe(map((categories: Category[]) => this.getStackDto(stack, [], categories)));
  }

  private getStackDto(stack: Stack, languages?: Language[], categories?: Category[]): StackDto {
    const { icon, id, name, source, website } = stack;
    return new StackDto(
      id,
      icon,
      name,
      source,
      website,
      languages?.map((language: Language) => StacksService.getLanguageDto(language)),
      categories?.map((category: Category) => StacksService.getCategoryDto(category)),
    );
  }
}
