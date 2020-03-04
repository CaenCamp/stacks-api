
import {RawCategory, RawLanguage} from '../data/model';

export interface Stack {
  id: string;
  name: string;
  website: string;
  source: string;
  icon: string;
  languages: RawLanguage[];
  categories: RawCategory[];
}
