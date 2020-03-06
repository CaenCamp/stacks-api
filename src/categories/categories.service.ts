import { HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CategoriesRepository, Stack, StacksRepository } from '../data';
import { Observable } from 'rxjs';
import { CategoryDto, CategoryStackDto } from '../categories/dto';
import { catchError, flatMap, map, toArray } from 'rxjs/operators';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly categoriesRepository: CategoriesRepository,
    private readonly stacksRepository: StacksRepository,
  ) {}

  private NOT_FOUND_ERROR = 'EmptyError';

  public findAll(): Observable<CategoryDto[]> {
    return this.categoriesRepository.findAll().pipe(
      flatMap((categories: CategoryDto[]) => categories),
      map((category: CategoryDto) => CategoriesService.getCategorykDto(category)),
      toArray(),
      catchError((error: Error) => {
        throw this.handleError(error);
      }),
    );
  }

  public findOne(id: string): Observable<CategoryDto> {
    return this.categoriesRepository.findOne(id).pipe(
      map((category: CategoryDto) => CategoriesService.getCategorykDto(category)),
      catchError((error: Error) => {
        throw this.handleError(error, id);
      }),
    );
  }

  public findStacks(id: string): Observable<CategoryStackDto[]> {
    return this.categoriesRepository.findOne(id).pipe(
      flatMap((category: CategoryDto) =>
        this.stacksRepository.findAll({
          categories: [category.id],
        }),
      ),
      flatMap((stacks: Stack[]) => stacks),
      map((stack: Stack) => CategoriesService.getStackDto(stack)),
      toArray(),
      catchError((error: Error) => {
        throw this.handleError(error, id);
      }),
    );
  }

  private handleError(error: Error, id?: string): HttpException {
    if (error.name === this.NOT_FOUND_ERROR) {
      return new NotFoundException(`Category "${id}" was not found`);
    }
    return new InternalServerErrorException(error);
  }

  private static getStackDto(stack: Stack): CategoryStackDto {
    const { id, icon, name, source, website } = stack;
    return new CategoryStackDto(id, icon, name, source, website);
  }

  private static getCategorykDto(category: CategoryDto): CategoryDto {
    const { icon, id, name, summary } = category;
    return new CategoryDto(id, icon, name, summary);
  }
}
