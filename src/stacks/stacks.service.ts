import { Injectable } from '@nestjs/common';
import { Stack } from './stack.interface';
import {readdir, readFileSync} from 'fs-extra';

@Injectable()
export class StacksService {

  private getFile(path: string): Stack {
    return JSON.parse(readFileSync(`${path}`, 'utf8'));
  }
  async findAll(): Promise<Stack[]> {
    const path = './data/stacks';
    const filesName = await readdir(path);
    return filesName.map((name: string) => this.getFile(`${path}/${name}`));
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
