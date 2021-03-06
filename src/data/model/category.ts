import { IsDefined } from 'class-validator';

export class Category {
  @IsDefined()
  id: string;
  @IsDefined()
  name: string;
  @IsDefined()
  summary: string;
  @IsDefined()
  icon: string;

  constructor(id: string, icon: string, name: string, summary: string) {
    this.id = id;
    this.name = name;
    this.summary = summary;
    this.icon = icon;
  }
}
