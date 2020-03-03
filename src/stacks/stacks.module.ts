import { Module } from '@nestjs/common';
import { StacksController } from './stacks.controller';
import { StacksService } from './stacks.service';

@Module({
  imports: [
    StacksModule,
  ],
  controllers: [StacksController],
  providers: [StacksService],
})
export class StacksModule {
}
