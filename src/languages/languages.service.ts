import { Injectable } from '@nestjs/common';
import { LanguageDto, LanguageStackDto } from './dto';
import { LanguagesRepository, Language, RawStack, StacksRepository } from '../data';
import { Observable } from 'rxjs';
import { flatMap, map, toArray } from 'rxjs/operators';

@Injectable()
export class LanguagesService {
  constructor(
    private readonly languagesRepository: LanguagesRepository,
    private readonly stacksRepository: StacksRepository,
  ) {}

  private static toLanguageStack(stack: RawStack): LanguageStackDto {
    return {
      name: stack.name,
    };
  }

  // @TODO à supprimer
  private static rawToLanguage(language: Language): LanguageDto {
    const { icon, id, name, url } = language;
    return {
      icon,
      id,
      name,
      url,
    };
  }

  findAll(): Observable<Language[]> {
    return this.languagesRepository.findAll().pipe(
      flatMap((languages: Language[]) => languages),
      map((language: Language) => LanguagesService.rawToLanguage(language)),
      toArray(),
    );
  }

  findOne(id: string): Observable<LanguageDto> {
    return this.languagesRepository
      .findOne(id)
      .pipe(map((language: Language) => LanguagesService.rawToLanguage(language)));
  }

  findStacks(id: string): Observable<LanguageStackDto[]> {
    return this.languagesRepository.findOne(id).pipe(
      flatMap((language: Language) =>
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
