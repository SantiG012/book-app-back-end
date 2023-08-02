import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CollectionBookDto, CollectionIdDto, CollectionInfoDto, CreateCollectionDto } from './dtos/index';
import { AbstractCollectionsService } from './abstract-collections.service';
import { JwtAuthGuard } from 'src/auth/guards';
import { GetUser } from 'src/auth/decorators';
import { CountDto } from 'src/global-dtos';
import { BookInfoDto } from 'src/book/book-dtos';
import { AbstracBookService } from 'src/book/abstract-book.service';

@UseGuards(JwtAuthGuard)
@Controller('collections')
export class CollectionsController {
    constructor(
         private readonly collectionsService: AbstractCollectionsService,
         private readonly bookService:AbstracBookService
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

    @Get('getBooksByCollectionId/:collectionId')
    async getBooksByCollectionId(@Param('collectionId')collectionId:CollectionIdDto):Promise<BookInfoDto[]>{
        const bookIds:string[] = await this.collectionsService.getBooksByCollectionId(collectionId);
        const books:BookInfoDto[] = await this.bookService.findBooksById(bookIds);
        
        return books;
    }
}
