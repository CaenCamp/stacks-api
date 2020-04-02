export class SearchDto {
  id: string;
  name: string;
  website: string;
  icon: string;
  type: string;

  constructor(id: string, icon: string, name: string, website: string, type: string) {
    this.id = id;
    this.name = name;
    this.website = website;
    this.icon = icon;
    this.type = type;
  }
}
