import { Injectable } from '@nestjs/common';
import { Language, LanguageStack } from './dto';
import { LanguagesRepository, RawLanguage, RawStack, StacksRepository } from '../data';
import { Observable } from 'rxjs';
import { flatMap, map, toArray } from 'rxjs/operators';

@Injectable()
export class LanguagesService {
  constructor(
    private readonly languagesRepository: LanguagesRepository,
    private readonly stacksRepository: StacksRepository,
  ) {}

  private static toLanguageStack(stack: RawStack): LanguageStack {
    return {
      name: stack.name,
    };
  }

  // @TODO à supprimer
  private static rawToLanguage(rawLanguage: RawLanguage): Language {
    const { icon, id, name, url } = rawLanguage;
    return {
      icon,
      id,
      name,
      url,
    };
  }

  findAll(): Observable<RawLanguage[]> {
    return this.languagesRepository.findAll().pipe(
      flatMap((languages: RawLanguage[]) => languages),
      map((language: RawLanguage) => LanguagesService.rawToLanguage(language)),
      toArray(),
    );
  }

  findOne(id: string): Observable<Language> {
    return this.languagesRepository
      .findOne(id)
      .pipe(map((language: RawLanguage) => LanguagesService.rawToLanguage(language)));
  }

  findStacks(id: string): Observable<LanguageStack[]> {
    return this.languagesRepository.findOne(id).pipe(
      flatMap((language: RawLanguage) =>
        this.stacksRepository.findAll({
          languages: [language.id],
        }),
      ),
      flatMap((stacks: RawStack[]) => stacks),
      map((stack: RawStack) => LanguagesService.toLanguageStack(stack)),
      toArray(),
    );
  }
}
