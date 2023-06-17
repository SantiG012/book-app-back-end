import { Body, Controller,Post} from '@nestjs/common';
import { AbstracBookService } from '../abstract-book.service';
import { BookCreationDto } from '../book-dtos';
import { Book } from '@prisma/client';
import { Observable} from 'rxjs';

@Controller('book')
export class BookController {
    constructor(private readonly bookService: AbstracBookService) {}

    @Post('createBook')
    createBook(@Body() bookDto:BookCreationDto):Observable<{bookId:string}> {
        
        return this.bookService.createBook(bookDto);
    }
}
