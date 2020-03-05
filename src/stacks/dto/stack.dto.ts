import { StackLanguageDto } from './language.dto';
import { StackCategorieDto } from './categorie.dto';

export class StackDto {
  id: string;
  name: string;
  website: string;
  source: string;
  icon: string;
  languages: StackLanguageDto[] = [];
  categories: StackCategorieDto[] = [];

  constructor(
    id: string,
    name: string,
    website: string,
    source: string,
    icon: string,
    languages?: StackLanguageDto[],
    categories?: StackCategorieDto[],
  ) {
    this.id = id;
    this.name = name;
    this.website = website;
    this.source = source;
    this.icon = icon;
    this.languages = languages ?? [];
    this.categories = categories ?? [];
  }
}
