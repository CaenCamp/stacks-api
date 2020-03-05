import { Injectable } from '@nestjs/common';
import { Stack } from './stack.interface';
import { DataService, RawCategory, RawLanguage, RawStack } from '../data';
import { Observable } from 'rxjs';
import { filter, find, first, flatMap, map, toArray } from 'rxjs/operators';

@Injectable()
export class StacksService {
  constructor(private readonly dataService: DataService) {}

  public findAll(): Observable<Stack[]> {
    return this.dataService.stacks$.pipe(
      flatMap((stacks: RawStack[]) => stacks),
      map((stack: RawStack) => this.rawToStack(stack)),
      toArray(),
    );
  }

  public findOne(id): Observable<Stack> {
    return this.dataService.stacks$.pipe(
      flatMap((stacks: RawStack[]) => stacks),
      find((stack: RawStack) => stack.id === id),
      flatMap((stack: RawStack) =>
        this.findLanguages(stack.languages).pipe(
          map((languages: RawLanguage[]) =>
            this.rawToStack(stack, languages, []),
          ),
        ),
      ),
    );
  }

  public findLanguages(languagesId: string[]): Observable<RawLanguage[]> {
    return this.dataService.languages$.pipe(
      flatMap((languages: RawLanguage[]) => languages),
      filter((language: RawLanguage) => languagesId.includes(language.id)),
      toArray(),
    );
  }

  // @TODO à supprimer
  private rawToStack(
    rawStack: RawStack,
    languages?: RawLanguage[],
    categories?: RawCategory[],
  ): Stack {
    const { icon, id, name, source, website } = rawStack;
    let ret: Stack = {
      icon,
      id,
      name,
      source,
      website,
    };
    if (languages && languages.length > 0) {
      ret = { ...ret, languages };
    }
    if (categories && categories.length > 0) {
      ret = { ...ret, categories };
    }
    return ret;
  }
}
