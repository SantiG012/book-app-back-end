import { Body, Controller, Post } from '@nestjs/common';
import { CollectionIdDto, CreateCollectionDto } from './dtos/index';
import { AbstractCollectionsService } from './abstract-collections.service';

@Controller('collections')
export class CollectionsController {
    constructor(
         private readonly collectionsService: AbstractCollectionsService
    ) {}

    @Post('createCollection')
    async createCollection(@Body()createCollectionDto:CreateCollectionDto): Promise<CollectionIdDto> {
        return await this.collectionsService.createCollection(createCollectionDto);
    }
}
