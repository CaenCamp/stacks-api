import { Injectable } from '@nestjs/common';
import { LanguageDto, LanguageStackDto } from './dto';
import { LanguagesRepository, Language, Stack, StacksRepository } from '../data';
import { Observable } from 'rxjs';
import { flatMap, map, toArray } from 'rxjs/operators';

@Injectable()
export class LanguagesService {
  constructor(
    private readonly languagesRepository: LanguagesRepository,
    private readonly stacksRepository: StacksRepository,
  ) {}

  private static toLanguageStack(stack: Stack): LanguageStackDto {
    const { id, icon, name, source, website } = stack;
    return new LanguageStackDto(id, icon, name, source, website);
  }

  // @TODO à supprimer
  private static rawToLanguage(language: Language): LanguageDto {
    const { icon, id, name, url } = language;
    return new LanguageDto(id, icon, name, url);
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
      flatMap((stacks: Stack[]) => stacks),
      map((stack: Stack) => LanguagesService.toLanguageStack(stack)),
      toArray(),
    );
  }
}
