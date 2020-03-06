export class StackDto {
  id: string;
  name: string;
  website: string;
  source: string;
  icon: string;

  constructor(id: string, icon: string, name: string, source: string, website: string) {
    this.id = id;
    this.name = name;
    this.website = website;
    this.source = source;
    this.icon = icon;
  }
}
