import { Body, Controller,Post} from '@nestjs/common';
import { AbstracBookService } from './abstract-book.service';
import { BookCreationDto, BookCreationResponseDto } from './book-dtos';

@Controller('book')
export class BookController {
    constructor(private readonly bookService: AbstracBookService) {}

    @Post('createBook')
    async createBook(@Body() bookDto:BookCreationDto):Promise<BookCreationResponseDto> {
        
        return await this.bookService.createBook(bookDto);
    }
}