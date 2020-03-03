import { Language } from '../languages';
import { Category } from '../categories';

export interface Stack {
  id: number;
  name: string;
  url: string;
  icon: string;
  languages: Language[];
  categories: Category[];
}
