import {Injectable} from '@nestjs/common';
import {Language} from './language.interface';
import {DataService, RawCategory, RawLanguage, RawStack} from '../data';
import {Observable} from 'rxjs';
import {filter, find, flatMap, map, toArray} from 'rxjs/operators';
import {Stack} from '../stacks';

@Injectable()
export class LanguagesService {

  constructor(private readonly dataService: DataService) {
  }

  // @TODO à supprimer
  private rawToLanguage(rawLanguage: RawLanguage, stacks?: RawStack[]): Language {
    const {icon, id, name, url} = rawLanguage;
    let ret: Language = {
      icon, id, name, url,
    };
    if (stacks && stacks.length > 0) {
      ret = {...ret, stacks : stacks.map(stack => this.rawToStack(stack))};
    }
    return ret;
  }

  // @TODO à supprimer
  private rawToStack(rawStack: RawStack, languages?: RawLanguage[], categories?: RawCategory[]): Stack {
    const {icon, id, name, source, website} = rawStack;
    let ret: Stack = {
      icon, id, name, source, website,
    };
    if (languages && languages.length > 0) {
      ret = {...ret, languages};
    }
    if (categories && categories.length > 0) {
      ret = {...ret, categories};
    }
    return ret;
  }

  findAll(): Observable<Language[]> {
    return this.dataService.languages$.pipe(
      flatMap((languages: RawLanguage[]) => languages),
      flatMap((language: RawLanguage) => this.findStacks(language.id).pipe(
        map((stacks: RawStack[]) => this.rawToLanguage(language, stacks),
        )),
      ),
      toArray(),
    );
  }

  findOne(id): Observable<Language> {
    return this.dataService.languages$.pipe(
      flatMap((languages: RawLanguage[]) => languages),
      find((language: RawLanguage) => language.id === id),
      flatMap((language: RawLanguage) => this.findStacks(id).pipe(
        map((stacks: RawStack[]) => this.rawToLanguage(language, stacks),
        )),
      ));
  }

  findStacks(id: string) {
    return this.findStacksForLanguage(id).pipe(
      flatMap((stacks: RawStack[]) => stacks),
      map((stack: RawStack) => {
        delete stack.languages;
        delete stack.categories;
        return stack;
      }),
      toArray(),
    );
  }

  findStacksForLanguage(languageId: string): Observable<RawStack[]> {
    return this.dataService.stacks$.pipe(
      flatMap((stacks: RawStack[]) => stacks),
      filter((stack: RawStack) => stack.languages.includes(languageId)),
      toArray(),
    );
  }
}
