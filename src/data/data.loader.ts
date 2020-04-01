import { Injectable } from '@nestjs/common';
import { from, Observable, OperatorFunction } from 'rxjs';
import { Category, Language, Stack } from './model';
import * as yaml from 'js-yaml';
import * as fs from 'fs';
import * as path from 'path';
import { filter, flatMap, map, tap, toArray } from 'rxjs/operators';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

export const CATEGORIES = 'categories';
export const LANGUAGES = 'languages';
export const STACKS = 'stacks';

declare type ClassType<T> = new (...args: any[]) => T;

@Injectable()
export class DataLoader {
  private static readDir(filePath: string): Observable<string[]> {
    return new Observable<string[]>(subscriber => {
      fs.readdir(filePath, (err, files) => {
        if (err != null) {
          subscriber.error(err);
        }
        if (files != null) {
          subscriber.next(files);
          subscriber.complete();
        }
      });
    });
  }

  private static readFile(filePath: string): Observable<string> {
    return new Observable<string>(subscriber => {
      fs.readFile(filePath, 'utf8', (err, buffer) => {
        if (err != null) {
          subscriber.error(err);
        }
        if (buffer != null) {
          subscriber.next(buffer);
          subscriber.complete();
        }
      });
    });
  }

  private static loadYaml(filename: string, content: string): any {
    const struct = yaml.safeLoad(content);
    const id = path.parse(filename).name;
    if (id !== struct.id) {
      throw new Error(`id mismatches filename: ${struct.id} != ${id}`);
    }
    return struct;
  }

  public get dataFolderPath(): string {
    return `${process.cwd()}/data`;
  }

  public readDataFolder(name: string): Observable<string> {
    const folder = `${this.dataFolderPath}/${name}`;
    return DataLoader.readDir(folder).pipe(
      flatMap(files =>
        from(files).pipe(
          filter(file => path.parse(file).ext === '.yaml'),
          map(file => `${folder}/${file}`),
        ),
      ),
    );
  }

  public readDataYaml<T>(cls: ClassType<T>): OperatorFunction<string, T> {
    return flatMap((file: string) =>
      DataLoader.readFile(file).pipe(
        map(content => DataLoader.loadYaml(file, content)),
        map((category: T) => plainToClass(cls, category)),
        tap((category: T) => validate(category)),
      ),
    );
  }

  public loadCategories(): Observable<Category[]> {
    return this.readDataFolder(CATEGORIES).pipe(this.readDataYaml(Category), toArray());
  }

  public loadLanguages(): Observable<Language[]> {
    return this.readDataFolder(LANGUAGES).pipe(this.readDataYaml(Language), toArray());
  }

  public loadStacks(): Observable<Stack[]> {
    return this.readDataFolder(STACKS).pipe(this.readDataYaml(Stack), toArray());
  }
}
