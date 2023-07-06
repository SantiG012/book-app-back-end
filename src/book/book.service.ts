import { HttpException, Injectable } from '@nestjs/common';
import { AbstracBookService } from './abstract-book.service';
import { AbstractPrismaService } from '../prisma/abstract-prisma.service';
import { v4 as uuidv4 } from "uuid";
import { AddAuthorDto, BookIdDto,CreateBookDto } from './book-dtos';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { createError } from '../data-base-common-exceptions/exceptions-messages';

@Injectable()
export class BookService implements AbstracBookService {
    constructor(private readonly prisma: AbstractPrismaService) {}
    
    async createBook(book:CreateBookDto):Promise<BookIdDto> {
        const data = this.createBookObject(book);

        
        try {        
            const bookId:BookIdDto = await this.prisma.book.create({
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

    async addAnAuthor(addAuthorDto:AddAuthorDto):Promise<AddAuthorDto> {
        try{
            const bookAuthor = await this.prisma.book_author.create({
                data:this.createBookAuthorObject(addAuthorDto),
                select:{
                    bookId:true,
                    authorId:true
                }
            });

            return bookAuthor;
        } catch (error:PrismaClientKnownRequestError | any) {
            throw createError(error.code || 'UNKNOWN_ERROR','Book');
        }

    }

    private createBookObject(book:CreateBookDto) {
        return {
            bookId: uuidv4(),
            bookTitle: book.title,
            coverUrl: book.coverUrl,
            bookStatus:'active'
        };
    }


    private createBookAuthorObject(addAuthorDto:AddAuthorDto) {
        return {
            bookId: addAuthorDto.bookId,
            authorId: addAuthorDto.authorId,
            bookAuthorStatus:'active'
        };
    }
}
