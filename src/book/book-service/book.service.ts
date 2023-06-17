import { Injectable } from '@nestjs/common';
import { AbstracBookService } from '../abstract-book.service';
import { AbstractPrismaService } from 'src/prisma/abstract-prisma.service';
import { BookCreationDto } from '../book-dtos';
import { v4 as uuidv4 } from "uuid";
import { Observable, from } from 'rxjs';
import { Book } from '@prisma/client';

@Injectable()
export class BookService implements AbstracBookService {
    constructor(private readonly prisma: AbstractPrismaService) {}
    
    createBook(book:BookCreationDto):Observable<Book> {
        const data = {
            bookId: uuidv4(),
            bookTitle: book.title,
            coverUrl: book.coverUrl,
            bookStatus:'active'
        };

        return from(this.prisma.book.create({data}));
    }
}
