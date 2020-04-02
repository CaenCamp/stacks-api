export class StackLanguageDto {
  id: string;
  name: string;
  website: string;
  icon: string;

  constructor(id: string, icon: string, name: string, website: string) {
    this.id = id;
    this.name = name;
    this.website = website;
    this.icon = icon;
  }
}
