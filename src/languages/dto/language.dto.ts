import { LanguageStackDto } from './stack.dto';

export class LanguageDto {
  id: string;
  name: string;
  url: string;
  icon: string;
  stacks?: LanguageStackDto[];

  constructor(id: string, icon: string, name: string, url: string, stacks?: LanguageStackDto[]) {
    this.id = id;
    this.icon = icon;
    this.name = name;
    this.url = url;
    this.stacks = stacks ?? [];
  }
}
