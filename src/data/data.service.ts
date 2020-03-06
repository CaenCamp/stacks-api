import {BehaviorSubject, Observable} from 'rxjs';
import {Category, Language, Stack} from './model';
import {first} from 'rxjs/operators';

export class DataService {
  private stacksSubject: BehaviorSubject<Stack[]>;
  private languagesSubject: BehaviorSubject<Language[]>;
  private categorySubject: BehaviorSubject<Category[]>;

  constructor(stacks: Stack[], languages: Language[], categories: Category[]) {
    this.stacksSubject = new BehaviorSubject<Stack[]>(stacks);
    this.languagesSubject = new BehaviorSubject<Language[]>(languages);
    this.categorySubject = new BehaviorSubject<Category[]>(categories);
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
}
