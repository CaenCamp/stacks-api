import { Stack } from '../stacks';

export interface Category {
  id: number;
  name: string;
  summary: string;
  icon: string;
  stacks: Stack[];
}
