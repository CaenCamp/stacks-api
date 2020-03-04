import {forwardRef, Inject, Injectable} from '@nestjs/common';
import {Stack} from './stack.interface';
import {DataService, RawLanguage, RawStack} from '../data';
import {Observable} from 'rxjs';
import {filter, find, flatMap, map, toArray} from 'rxjs/operators';
import {LanguagesService} from '../languages';

@Injectable()
export class StacksService {

  @Inject(forwardRef(() => StacksService))
  private readonly languageService: LanguagesService;

  private stacks$ = this.dataService.loadStacks();

  constructor(private readonly dataService: DataService) {
  }

  findAll(): Observable<Stack[]> {
    return this.stacks$.pipe(
      flatMap((stacks: RawStack[]) => stacks),
      flatMap((stack: RawStack) => this.findLanguages(stack.languages).pipe(
        map((languages: RawLanguage[]) => ({
            ...stack,
            languages,
            categories: [],
          }),
        )),
      ),
      toArray(),
    );
  }

  findOne(id): Observable<Stack> {
    return this.stacks$.pipe(
      flatMap((stacks: RawStack[]) => stacks),
      find((stack: RawStack) => stack.id === id),
      flatMap((stack: RawStack) => this.findLanguages(stack.languages).pipe(
        map((languages: RawLanguage[]) => ({
            ...stack,
            languages,
            categories: [],
          }),
        )),
      ));
  }

  findLanguages(languagesId: string[]) {
    return this.languageService.findSome(languagesId);
  }

  findStacksForLanguage(languageId: string): Observable<RawStack[]> {
    return this.stacks$.pipe(
      flatMap((stacks: RawStack[]) => stacks),
      filter((stack: RawStack) => stack.languages.includes(languageId)),
      toArray(),
    );
  }
}
