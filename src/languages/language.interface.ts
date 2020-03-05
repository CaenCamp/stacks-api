import {Stack} from '../stacks';

export interface Language {
  id: string;
  name: string;
  url: string;
  icon: string;
  stacks?: Stack[];
}
