import { SearchStackDto } from './stack.dto';
import { SearchLanguageDto } from './language.dto';

export type SearchDto = Array<SearchStackDto | SearchLanguageDto>;
