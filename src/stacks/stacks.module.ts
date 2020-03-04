import {Module} from '@nestjs/common';
import {StacksController} from './stacks.controller';
import {StacksService} from './stacks.service';
import {DataModule} from '../data';

@Module({
  imports: [DataModule],
  controllers: [StacksController],
  providers: [StacksService],
  exports: [StacksService],
})
export class StacksModule {
}

