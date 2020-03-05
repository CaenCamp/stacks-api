
import {Language} from '../languages';
import {Category} from '../categories';

export interface Stack {
  id: string;
  name: string;
  website: string;
  source: string;
  icon: string;
  languages?: Language[];
  categories?: Category[];
}
