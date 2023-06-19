import { HttpException, Injectable } from '@nestjs/common';
import { AbstracBookService } from './abstract-book.service';
import { AbstractPrismaService } from 'src/prisma/abstract-prisma.service';
import { v4 as uuidv4 } from "uuid";
import { BookCreationResponseDto,BookCreationDto } from './book-dtos';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class BookService implements AbstracBookService {
    constructor(private readonly prisma: AbstractPrismaService) {}
    
    async createBook(book:BookCreationDto):Promise<BookCreationResponseDto> {
        const data = {
            bookId: uuidv4(),
            bookTitle: book.title,
            coverUrl: book.coverUrl,
            bookStatus:'active'
        };

        
        try {        
            const bookId:BookCreationResponseDto = await this.prisma.book.create({
                    data:data,
                    select:{
                        bookId:true
                    }
                });

            return bookId;
        }catch (error:PrismaClientKnownRequestError | any) {
            throw this.createError(error.code || 'UNKNOWN_ERROR');
        }

    }

    private createError(erroCode:string):HttpException{
        if (erroCode === 'P2002') {
            return new HttpException('Book already exists', 409);
        }
        return new HttpException('Internal server error', 500)
    }
}
