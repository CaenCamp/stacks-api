import { HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { StackCategoryDto, StackDto, StackLanguageDto } from './dto';
import { LanguagesRepository, Category, Language, Stack, StacksRepository, CategoriesRepository } from '../data';
import { Observable, throwError } from 'rxjs';
import { catchError, flatMap, map, tap, toArray } from 'rxjs/operators';

@Injectable()
export class StacksService {
  constructor(
    private readonly stacksRepository: StacksRepository,
    private readonly languagesRepository: LanguagesRepository,
    private readonly categoriesRepository: CategoriesRepository,
  ) {}

  public findAll(): Observable<StackDto[]> {
    return this.stacksRepository.findAll().pipe(
      flatMap((stacks: Stack[]) => stacks),
      map((stack: Stack) => StacksService.getStackDto(stack)),
      toArray(),
      catchError((error: Error) => throwError(error)),
    );
  }

  public findOne(id: string): Observable<StackDto> {
    return this.stacksRepository.findOne(id).pipe(
      map((stack: Stack) => StacksService.getStackDto(stack)),
      catchError((error: Error) => throwError(error)),
    );
  }

  public findLanguages(id: string): Observable<StackLanguageDto[]> {
    return this.stacksRepository.findOne(id).pipe(
      flatMap((stack: Stack) => this.stackLanguages$(stack)),
      flatMap((languages: Language[]) => languages),
      map((language: Language) => StacksService.getLanguageDto(language)),
      toArray(),
      catchError((error: Error) => throwError(error)),
    );
  }

  public findCategories(id: string): Observable<StackCategoryDto[]> {
    return this.stacksRepository.findOne(id).pipe(
      flatMap((stack: Stack) => this.stackCategories$(stack)),
      flatMap((categories: Category[]) => categories),
      map((category: Category) => StacksService.getCategoryDto(category)),
      toArray(),
      catchError((error: Error) => throwError(error)),
    );
  }

  private stackLanguages$(stack: Stack): Observable<Language[]> {
    return this.languagesRepository
      .findAll({ languages: stack.languages })
      .pipe(map((languages: Language[]) => languages));
  }

  private stackCategories$(stack: Stack): Observable<Category[]> {
    return this.categoriesRepository
      .findAll({ categories: stack.categories })
      .pipe(map((categories: Category[]) => categories));
  }

  private static getLanguageDto(language: Language): StackLanguageDto {
    const { name, icon, url, id } = language;
    return new StackLanguageDto(id, icon, name, url);
  }

  private static getCategoryDto(category: Category): StackCategoryDto {
    const { name, id, icon, summary } = category;
    return new StackCategoryDto(id, icon, name, summary);
  }

  private static getStackDto(stack: Stack): StackDto {
    const { icon, id, name, source, website } = stack;
    return new StackDto(id, icon, name, source, website);
  }
}
