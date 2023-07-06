import { Body, Controller,Post} from '@nestjs/common';
import { AbstracBookService } from './abstract-book.service';
import { CreateBookDto, BookIdDto, AddAuthorsDto } from './book-dtos';

@Controller('book')
export class BookController {
    constructor(private readonly bookService: AbstracBookService) {}

    @Post('createBook')
    async createBook(@Body() bookDto:CreateBookDto):Promise<BookIdDto> {
        
        return await this.bookService.createBook(bookDto);
    }

    @Post('addAnAuthor')
    async addAnAuthor(@Body() addAuthorDto:AddAuthorsDto):Promise<AddAuthorsDto> {
        return await this.bookService.addAnAuthor(addAuthorDto);
    }
}
