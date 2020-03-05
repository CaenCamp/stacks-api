import { Injectable } from '@nestjs/common';
import { DataService } from './data.service';
import { RawStack } from './model';
import { Observable } from 'rxjs';
import { filter, find, flatMap, toArray } from 'rxjs/operators';

export interface StacksFilter {
  languages?: string[];
}

@Injectable()
export class StacksRepository {
  constructor(private readonly dataService: DataService) {}

  private static filters(stack: RawStack, filters?: StacksFilter): boolean {
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

  public findAll(filters?: StacksFilter): Observable<RawStack[]> {
    return this.dataService.stacks$.pipe(
      flatMap((stacks: RawStack[]) => stacks),
      filter((stack: RawStack) => StacksRepository.filters(stack, filters)),
      toArray(),
    );
  }

  public findOne(id: string): Observable<RawStack> {
    return this.dataService.stacks$.pipe(
      flatMap((stacks: RawStack[]) => stacks),
      find((stack: RawStack) => stack.id === id),
    );
  }
}
