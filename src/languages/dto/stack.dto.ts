export class LanguageStackDto {
  id: string;
  name: string;
  website: string;
  source: string;
  icon: string;

  constructor(id: string, icon: string, name: string, source: string, website: string) {
    this.id = id;
    this.icon = icon;
    this.name = name;
    this.source = source;
    this.website = website;
  }
}
