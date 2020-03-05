import { Injectable } from '@nestjs/common';
import { Stack } from './stack.interface';
import {
  LanguagesRepository,
  RawCategory,
  RawLanguage,
  RawStack,
  StacksRepository,
} from '../data';
import { Observable } from 'rxjs';
import { flatMap, map, toArray } from 'rxjs/operators';

@Injectable()
export class StacksService {
  constructor(
    private readonly stacksRepository: StacksRepository,
    private readonly languagesRepository: LanguagesRepository,
  ) {}

  public findAll(): Observable<Stack[]> {
    return this.stacksRepository.findAll().pipe(
      flatMap((stacks: RawStack[]) => stacks),
      map((stack: RawStack) => this.rawToStack(stack)),
      toArray(),
    );
  }

  public findOne(id: string): Observable<Stack> {
    return this.stacksRepository
      .findOne(id)
      .pipe(
        flatMap((stack: RawStack) =>
          this.languagesRepository
            .findAll({ languages: stack.languages })
            .pipe(
              map((languages: RawLanguage[]) =>
                this.rawToStack(stack, languages, []),
              ),
            ),
        ),
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
