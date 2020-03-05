export class LanguageDto {
  id: string;
  name: string;
  url: string;
  icon: string;

  constructor(id: string, name: string, url: string, icon: string) {
    this.id = id;
    this.name = name;
    this.url = url;
    this.icon = icon;
  }
}
