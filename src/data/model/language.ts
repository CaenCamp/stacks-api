export class Language {
  id: string;
  name: string;
  website: string;
  icon: string;
  aliases?: string[];

  constructor(id: string, name: string, website: string, icon: string, aliases?: string[]) {
    this.id = id;
    this.name = name;
    this.website = website;
    this.icon = icon;
    this.aliases = aliases;
  }
}
