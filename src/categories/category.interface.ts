import { Stack } from '../stacks';

export interface Category {
  id: string;
  name: string;
  summary: string;
  icon: string;
  stacks?: Stack[];
}
