import { StackLanguageDto } from './language.dto';
import { StackCategorieDto } from './categorie.dto';

export class StackDto {
  id: string;
  name: string;
  website: string;
  source: string;
  icon: string;
  languages?: StackLanguageDto[];
  categories?: StackCategorieDto[];
}
