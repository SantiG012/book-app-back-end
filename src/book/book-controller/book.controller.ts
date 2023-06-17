import { Body, Controller,Post} from '@nestjs/common';
import { AbstracBookService } from '../abstract-book.service';
import { BookCreationDto } from '../book-dtos';
import { Book } from '@prisma/client';
import { Observable, catchError, tap } from 'rxjs';

@Controller('book')
export class BookController {
    constructor(private readonly bookService: AbstracBookService) {}
    @Post('createBook')
    createBook(@Body() bookDto:BookCreationDto):Observable<Book> {
        
        return this.bookService.createBook(bookDto).pipe(
            tap((book:Book) => console.log(book)),
            catchError((err) => {throw new Error(err)})
        )
    }
}
