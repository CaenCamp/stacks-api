export class LanguageDto {
  id: string;
  name: string;
  url: string;
  icon: string;

  constructor(id: string, icon: string, name: string, url: string) {
    this.id = id;
    this.icon = icon;
    this.name = name;
    this.url = url;
  }
}
