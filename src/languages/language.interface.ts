import {RawStack} from '../data/model';

export interface Language {
  id: string;
  name: string;
  url: string;
  icon: string;
  stacks: RawStack[];
}
