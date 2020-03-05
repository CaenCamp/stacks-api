import { IsDefined } from 'class-validator';

export class RawCategory {
  @IsDefined()
  id: string;
  @IsDefined()
  name: string;
  @IsDefined()
  summary: string;
  @IsDefined()
  icon: string;

  constructor(id: string, name: string, summary: string, icon: string) {
    this.id = id;
    this.name = name;
    this.summary = summary;
    this.icon = icon;
  }
}
