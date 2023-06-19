import { Body, Controller,Post} from '@nestjs/common';
import { AbstracBookService } from './abstract-book.service';
import { BookCreationDto, BookCreationResponseDto } from './book-dtos';

@Controller('book')
export class BookController {
    constructor(private readonly bookService: AbstracBookService) {}

    @Post('createBook')
    createBook(@Body() bookDto:BookCreationDto):Promise<BookCreationResponseDto> {
        
        return this.bookService.createBook(bookDto);
    }
}
