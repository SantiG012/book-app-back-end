import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AddBookDto, CollectionIdDto, CreateCollectionDto } from './dtos/index';
import { AbstractCollectionsService } from './abstract-collections.service';
import { JwtAuthGuard } from 'src/auth/guards';
import { GetUser } from 'src/auth/decorators';
import { CountDto } from 'src/global-dtos';

@UseGuards(JwtAuthGuard)
@Controller('collections')
export class CollectionsController {
    constructor(
         private readonly collectionsService: AbstractCollectionsService
    ) {}

    @Post('createCollection')
    async createCollection(
        @Body()createCollectionDto:CreateCollectionDto,
        @GetUser('sub') sub: string
    ): Promise<CollectionIdDto> {
        return await this.collectionsService.createCollection(createCollectionDto, sub);
    }

    @Post('addBooks')
    async addBooks(@Body() addBooksDto: AddBookDto[]): Promise<CountDto> {
        return await this.collectionsService.addBooks(addBooksDto);
    }
}
