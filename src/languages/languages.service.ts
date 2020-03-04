import {forwardRef, Inject, Injectable} from '@nestjs/common';
import {Language} from './language.interface';
import {DataService, RawLanguage, RawStack} from '../data';
import {Observable} from 'rxjs';
import {filter, find, flatMap, map, toArray} from 'rxjs/operators';
import {StacksService} from '../stacks';

@Injectable()
export class LanguagesService {

  @Inject(forwardRef(() => StacksService))
  private readonly stacksService: StacksService;

  private languages$ = this.dataService.loadLanguages();

  constructor(private readonly dataService: DataService) {
  }

  findAll(): Observable<Language[]> {
    return this.languages$.pipe(
      flatMap((languages: RawLanguage[]) => languages),
      flatMap((language: RawLanguage) => this.findStacks(language.id).pipe(
        map((stacks: RawStack[]) => ({
            ...language,
            stacks,
          }),
        )),
      ),
      toArray(),
    );
  }
  findOne(id): Observable<Language> {
    return this.languages$.pipe(
      flatMap((languages: RawLanguage[]) => languages),
      find((language: RawLanguage) => language.id === id),
      flatMap((language: RawLanguage) => this.findStacks(id).pipe(
        map((stacks: RawStack[]) => ({
            ...language,
            stacks,
          }),
        )),
      ));
  }

  findStacks(id: string) {
    return this.stacksService.findStacksForLanguage(id).pipe(
      flatMap((stacks: RawStack[]) => stacks),
      map((stack: RawStack) => {
        delete stack.languages;
        delete stack.categories;
        return stack;
      }),
      toArray(),
    );
  }

  findSome(languagesId: string[]): Observable<RawLanguage[]> {
    return this.languages$.pipe(
      flatMap((languages: RawLanguage[]) => languages),
      filter((language: RawLanguage) => languagesId.includes(language.id)),
      toArray(),
    );
  }
}
