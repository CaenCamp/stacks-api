export class StackLanguageDto {
  id: string;
  name: string;
  url: string;
  icon: string;

  constructor(id: string, icon: string, name: string, url: string) {
    this.id = id;
    this.name = name;
    this.url = url;
    this.icon = icon;
  }
}
