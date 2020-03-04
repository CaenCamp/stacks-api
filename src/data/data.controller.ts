import { Controller, Get } from '@nestjs/common';
import {DataService} from './data.service';
import {Observable} from 'rxjs';
import {RawCategory, RawLanguage, RawStack} from './model';

// TODO remove this temporary service
@Controller('data')
export class DataController {
    constructor(private readonly dataService: DataService) {
    }

    @Get('/languages')
    getLanguages(): Observable<RawLanguage[]> {
        return this.dataService.loadLanguages();
    }

    @Get('/categories')
    getCategories(): Observable<RawCategory[]> {
        return this.dataService.loadCategories();
    }

    @Get('/stacks')
    getStacks(): Observable<RawStack[]> {
        return this.dataService.loadStacks();
    }
}
