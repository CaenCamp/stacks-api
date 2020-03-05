import { Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { RawCategory, RawLanguage, RawStack } from './model';
import * as yaml from 'js-yaml';
import * as fs from 'fs';
import * as path from 'path';
import { flatMap, map, toArray } from 'rxjs/operators';

@Injectable()
export class DataService {
  private readonly CATEGORIES = 'categories';
  private readonly LANGUAGES = 'languages';
  private readonly STACKS = 'stacks';

  public stacks$ = this.loadStacks();
  public languages$ = this.loadLanguages();
  public categories$ = this.loadCategories();

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

  public loadCategories(): Observable<RawCategory[]> {
    return this.readDataFolder(this.CATEGORIES).pipe(toArray());
  }

  public loadLanguages(): Observable<RawLanguage[]> {
    return this.readDataFolder(this.LANGUAGES).pipe(toArray());
  }

  public loadStacks(): Observable<RawStack[]> {
    return this.readDataFolder(this.STACKS).pipe(toArray());
  }

  public readDataFolder(name: string): Observable<any> {
    const folder = `${process.cwd()}/data/${name}`;
    return DataService.readDir(folder).pipe(
      flatMap(files =>
        from(files).pipe(
          map(file => `${folder}/${file}`),
          flatMap(file =>
            DataService.readFile(file).pipe(
              map(content => DataService.loadYaml(file, content)),
            ),
          ),
        ),
      ),
    );
  }
}
