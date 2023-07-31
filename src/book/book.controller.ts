import { Body, Controller,Post, UseGuards} from '@nestjs/common';
import { AbstracBookService } from './abstract-book.service';
import { CreateBookDto, BookIdDto, AddAuthorDto } from './book-dtos';
import { JwtAuthGuard } from 'src/auth/guards';
import { CountDto } from 'src/global-dtos';

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
}
