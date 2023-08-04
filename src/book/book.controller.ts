import { Body, Controller,Get,Param,Post, Put, UseGuards} from '@nestjs/common';
import { AbstracBookService } from './abstract-book.service';
import { CreateBookDto, BookIdDto, AddAuthorDto, BookInfoDto } from './book-dtos';
import { JwtAuthGuard } from 'src/auth/guards';
import { CountDto, CoverUrlDto } from 'src/global-dtos';

@UseGuards(JwtAuthGuard)
@Controller('book')
export class BookController {
    constructor(private readonly bookService: AbstracBookService) {}

    @Post('createBook')
    async createBook(@Body() bookDto:CreateBookDto):Promise<BookIdDto> {
        
        return await this.bookService.createBook(bookDto);
    }

    @Post('addAnAuthor')
    async addAuthors(@Body() addAuthorDto:AddAuthorDto[]):Promise<CountDto> {
        return await this.bookService.addAuthors(addAuthorDto);
    }

    @Get('getBooksByCollectionId/:collectionId')
    async getBooksByCollectionId(@Param('collectionId') collectionId:string):Promise<BookInfoDto[]>{
        const bookIds:string[] = await this.bookService.getBookIdsFromCollection(collectionId);
        const books:BookInfoDto[] = await this.bookService.findBooksById(bookIds);

        return books;
    }

    @Put('editBookCoverUrl/:bookId')
    async editBookCoverUrl(@Param('bookId') bookId:string, @Body() coverUrl:CoverUrlDto):Promise<BookIdDto>{
        return await this.bookService.editBookCoverUrl(bookId, coverUrl)
    }

    @Put('deleteBook/:bookId')
    async deleteBook(@Param('bookId') bookId:string):Promise<BookIdDto>{
        return await this.bookService.deleteBook(bookId);
    }
}
