export class StackCategoryDto {
  id: string;
  icon: string;
  name: string;
  summary: string;

  constructor(id: string, icon: string, name: string, summary: string) {
    this.id = id;
    this.icon = icon;
    this.name = name;
    this.summary = summary;
  }
}
