import { Injectable } from '@nestjs/common';
import {BehaviorSubject, from, Observable, ObservedValueOf, OperatorFunction} from 'rxjs';
import { Category, Language, Stack } from './model';
import * as yaml from 'js-yaml';
import * as fs from 'fs';
import * as path from 'path';
import { filter, first, flatMap, map, tap, toArray } from 'rxjs/operators';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

export const CATEGORIES = 'categories';
export const LANGUAGES = 'languages';
export const STACKS = 'stacks';

declare type ClassType<T> = new (...args: any[]) => T;

@Injectable()
export class DataService {

  private stacksSubject = new BehaviorSubject<Stack[]>([]);
  private languagesSubject = new BehaviorSubject<Language[]>([]);
  private categorySubject = new BehaviorSubject<Category[]>([]);

  constructor() {
    this.loadLanguages()
      .pipe(tap(languages => this.languagesSubject.next(languages)))
      .subscribe();
    this.loadCategories()
      .pipe(tap(categories => this.categorySubject.next(categories)))
      .subscribe();
    this.loadStacks()
      .pipe(tap(stacks => this.stacksSubject.next(stacks)))
      .subscribe();
  }

  public get stacks$(): Observable<Stack[]> {
    return this.stacksSubject.asObservable().pipe(first());
  }

  public get languages$(): Observable<Language[]> {
    return this.languagesSubject.asObservable().pipe(first());
  }

  public get categories$(): Observable<Category[]> {
    return this.categorySubject.asObservable().pipe(first());
  }

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

  public readDataFolder(name: string): Observable<string> {
    const folder = `${process.cwd()}/data/${name}`;
    return DataService.readDir(folder).pipe(
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
      DataService.readFile(file).pipe(
        map(content => DataService.loadYaml(file, content)),
        map((category: T) => plainToClass(cls, category)),
        tap((category: T) => validate(category)),
      ),
    );
  }

  private loadCategories(): Observable<Category[]> {
    return this.readDataFolder(CATEGORIES).pipe(this.readDataYaml(Category), toArray());
  }

  private loadLanguages(): Observable<Language[]> {
    return this.readDataFolder(LANGUAGES).pipe(this.readDataYaml(Language), toArray());
  }

  private loadStacks(): Observable<Stack[]> {
    return this.readDataFolder(STACKS).pipe(this.readDataYaml(Stack), toArray());
  }
}
