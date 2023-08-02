import { Module } from '@nestjs/common';
import { CollectionsController } from './collections.controller';
import { CollectionsService } from './collections.service';
import { AbstractCollectionsService } from './abstract-collections.service';
import { BookModule } from 'src/book/book.module';

@Module({
  imports: [BookModule],
  controllers: [CollectionsController],
  providers: [{
    provide: AbstractCollectionsService,
    useClass: CollectionsService
  }]
})
export class CollectionsModule {}
