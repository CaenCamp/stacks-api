import { Injectable } from '@nestjs/common';
import { Stack } from './model';
import { Observable, throwError } from 'rxjs';
import { catchError, filter, first, flatMap, toArray } from 'rxjs/operators';
import { DataService } from './data.service';

export interface StacksFilter {
  languages?: string[];
  categories?: string[];
}

@Injectable()
export class StacksRepository {
  constructor(private readonly dataRepository: DataService) {}

  private static filters(stack: Stack, filters?: StacksFilter): boolean {
    if (filters == null) {
      return true;
    }
    let result = true;
    if (filters.languages != null) {
      result =
        result &&
        filters.languages.reduce((contains: boolean, currentValue: string) => {
          return contains || (stack.languages ?? []).includes(currentValue);
        }, false);
    }
    if (filters.categories != null) {
      result =
        result &&
        filters.categories.reduce((contains: boolean, currentValue: string) => {
          return contains || (stack.categories ?? []).includes(currentValue);
        }, false);
    }
    return result;
  }

  public findAll(filters?: StacksFilter): Observable<Stack[]> {
    return this.dataRepository.stacks$.pipe(
      flatMap((stacks: Stack[]) => stacks),
      filter((stack: Stack) => StacksRepository.filters(stack, filters)),
      toArray(),
    );
  }

  public findOne(id: string): Observable<Stack> {
    return this.dataRepository.stacks$.pipe(
      flatMap((stacks: Stack[]) => stacks),
      first((stack: Stack) => stack.id === id),
      catchError(error => throwError(error)),
    );
  }
}
