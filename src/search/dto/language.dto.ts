export class SearchLanguageDto {
  id: string;
  name: string;
  url: string;
  icon: string;
  type: 'language';

  constructor(id: string, icon: string, name: string, url: string) {
    this.id = id;
    this.name = name;
    this.url = url;
    this.icon = icon;
    this.type = 'language';
  }
}
