import { Controller, Get, InternalServerErrorException, NotFoundException, Param, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SearchDto } from './dto';

@ApiTags('Search')
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  search(@Query('query') query: string): Observable<SearchDto> {
    return this.searchService.search(query).pipe(
      catchError((error: Error) => {
        throw new InternalServerErrorException();
      }),
    );
  }
}
