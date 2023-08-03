import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CollectionBookDto, CollectionIdDto, CollectionInfoDto, CreateCollectionDto, CollectionNameDto } from './dtos/index';
import { AbstractCollectionsService } from './abstract-collections.service';
import { JwtAuthGuard } from 'src/auth/guards';
import { GetUser } from 'src/auth/decorators';
import { CountDto } from 'src/global-dtos';

@UseGuards(JwtAuthGuard)
@Controller('collections')
export class CollectionsController {
    constructor(
         private readonly collectionsService: AbstractCollectionsService,
    ) {}

    @Post('createCollection')
    async createCollection(
        @Body()createCollectionDto:CreateCollectionDto,
        @GetUser('sub') sub: string
    ): Promise<CollectionIdDto> {
        return await this.collectionsService.createCollection(createCollectionDto, sub);
    }

    @Post('addBooks')
    async addBooks(@Body() addBooksDto: CollectionBookDto[]): Promise<CountDto> {
        return await this.collectionsService.addBooks(addBooksDto);
    }

    @Get('getCollections')
    async getCollections(@GetUser('sub') sub: string): Promise<CollectionInfoDto[]> {
        return await this.collectionsService.getCollections(sub);
    }

    @Put('editCollectionName/:collectionId')
    async editCollectionName(@Param('collectionId') collectionId:string,@Body() collectionNameDto:CollectionNameDto):Promise<CollectionIdDto> {
        return await this.collectionsService.editCollectionName(collectionId, collectionNameDto);
    }
}
