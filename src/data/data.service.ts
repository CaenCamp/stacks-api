import { Injectable } from '@nestjs/common';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { Language, RawCategory, Stack } from './model';
import * as yaml from 'js-yaml';
import * as fs from 'fs';
import * as path from 'path';
import { first, flatMap, map, tap, toArray } from 'rxjs/operators';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class DataService {
  private readonly CATEGORIES = 'categories';
  private readonly LANGUAGES = 'languages';
  private readonly STACKS = 'stacks';

  private stacksSubject = new BehaviorSubject<Stack[]>([]);
  private languagesSubject = new BehaviorSubject<Language[]>([]);
  private categorySubject = new BehaviorSubject<RawCategory[]>([]);

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

  public get categories$(): Observable<RawCategory[]> {
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

  public readDataFolder(name: string): Observable<any> {
    const folder = `${process.cwd()}/data/${name}`;
    return DataService.readDir(folder).pipe(
      flatMap(files =>
        from(files).pipe(
          map(file => `${folder}/${file}`),
          flatMap(file => DataService.readFile(file).pipe(map(content => DataService.loadYaml(file, content)))),
        ),
      ),
    );
  }

  private loadCategories(): Observable<RawCategory[]> {
    return this.readDataFolder(this.CATEGORIES).pipe(
      map((category: RawCategory) => plainToClass(RawCategory, category)),
      tap((category: RawCategory) => validate(category)),
      toArray(),
    );
  }

  private loadLanguages(): Observable<Language[]> {
    return this.readDataFolder(this.LANGUAGES).pipe(
      map((language: Language) => plainToClass(Language, language)),
      tap((language: Language) => validate(language)),
      toArray(),
    );
  }

  private loadStacks(): Observable<Stack[]> {
    return this.readDataFolder(this.STACKS).pipe(
      map((stack: Stack) => plainToClass(Stack, stack)),
      tap((stack: Stack) => validate(stack)),
      toArray(),
    );
  }
}
