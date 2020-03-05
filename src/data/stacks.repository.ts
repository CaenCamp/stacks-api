import { Injectable, NotFoundException } from '@nestjs/common';
import { DataService } from './data.service';
import { Stack } from './model';
import { Observable, throwError } from 'rxjs';
import { catchError, filter, find, first, flatMap, tap, toArray } from 'rxjs/operators';

export interface StacksFilter {
  languages?: string[];
}

@Injectable()
export class StacksRepository {
  constructor(private readonly dataService: DataService) {}

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
    return result;
  }

  public findAll(filters?: StacksFilter): Observable<Stack[]> {
    return this.dataService.stacks$.pipe(
      flatMap((stacks: Stack[]) => stacks),
      filter((stack: Stack) => StacksRepository.filters(stack, filters)),
      toArray(),
    );
  }

  public findOne(id: string): Observable<Stack> {
    return this.dataService.stacks$.pipe(
      flatMap((stacks: Stack[]) => stacks),
      first((stack: Stack) => stack.id === id),
      catchError(error => throwError(error)),
    );
  }
}
