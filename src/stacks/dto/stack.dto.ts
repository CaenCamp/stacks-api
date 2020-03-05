import { StackLanguageDto } from './language.dto';
import { StackCategoryDto } from './category.dto';

export class StackDto {
  id: string;
  name: string;
  website: string;
  source: string;
  icon: string;
  languages: StackLanguageDto[] = [];
  categories: StackCategoryDto[] = [];

  constructor(
    id: string,
    icon: string,
    name: string,
    source: string,
    website: string,
    languages?: StackLanguageDto[],
    categories?: StackCategoryDto[],
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
