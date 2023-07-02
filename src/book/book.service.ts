import { HttpException, Injectable } from '@nestjs/common';
import { AbstracBookService } from './abstract-book.service';
import { AbstractPrismaService } from '../prisma/abstract-prisma.service';
import { v4 as uuidv4 } from "uuid";
import { BookCreationResponseDto,BookCreationDto } from './book-dtos';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { createError } from '../data-base-common-exceptions/exceptions-messages';

@Injectable()
export class BookService implements AbstracBookService {
    constructor(private readonly prisma: AbstractPrismaService) {}
    
    async createBook(book:BookCreationDto):Promise<BookCreationResponseDto> {
        const data = this.createBookObject(book);

        
        try {        
            const bookId:BookCreationResponseDto = await this.prisma.book.create({
                    data:data,
                    select:{
                        bookId:true
                    }
                });

            return bookId;
        }catch (error:PrismaClientKnownRequestError | any) {
            throw createError(error.code || 'UNKNOWN_ERROR','Book');
        }

    }

    private createBookObject(book:BookCreationDto) {
        return {
            bookId: uuidv4(),
            bookTitle: book.title,
            coverUrl: book.coverUrl,
            bookStatus:'active'
        };
    }
}
