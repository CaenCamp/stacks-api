export class LanguageDto {
  id: string;
  name: string;
  website: string;
  icon: string;

  constructor(id: string, icon: string, name: string, website: string) {
    this.id = id;
    this.icon = icon;
    this.name = name;
    this.website = website;
  }
}
