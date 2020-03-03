import { Injectable } from '@nestjs/common';
import { Stack } from './stack.interface';
import { readdir } from 'fs-extra';

@Injectable()
export class StacksService {

  async findAll(): Promise<Stack[]> {
    const test = await readdir('/data/stacks');
    console.log(test);
    return [];
  }

  async findOne(id: string): Promise<Stack> {
    return {
      categories: null,
      id: null,
      icon: null,
      name: null,
      url: null,
      languages: null,
    };
  }
}
