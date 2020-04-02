export class Stack {
  id: string;
  name: string;
  website: string;
  source: string;
  icon: string;
  languages?: string[] = [];
  categories?: string[] = [];
  aliases?: string[];

  constructor(
    id: string,
    name: string,
    website: string,
    source: string,
    icon: string,
    languages?: string[],
    categories?: string[],
    aliases?: string[],
  ) {
    this.id = id;
    this.name = name;
    this.website = website;
    this.source = source;
    this.icon = icon;
    this.languages = languages;
    this.categories = categories;
    this.aliases = aliases;
  }
}
