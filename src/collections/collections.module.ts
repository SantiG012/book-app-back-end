import { Module } from '@nestjs/common';
import { CollectionsController } from './collections.controller';
import { CollectionsService } from './collections.service';
import { AbstractCollectionsService } from './abstract-collections.service';

@Module({
  controllers: [CollectionsController],
  providers: [{
    provide: AbstractCollectionsService,
    useClass: CollectionsService
  }]
})
export class CollectionsModule {}
