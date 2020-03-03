import { Stack } from '../stacks';

export interface Language {
  id: number;
  name: string;
  url: string;
  icon: string;
  stacks: Stack[];
}
