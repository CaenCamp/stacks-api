export class Language {
  id: string;
  name: string;
  url: string;
  icon: string;
  aliases?: string[];

  constructor(id: string, name: string, url: string, icon: string, aliases?: string[]) {
    this.id = id;
    this.name = name;
    this.url = url;
    this.icon = icon;
    this.aliases = aliases;
  }
}
