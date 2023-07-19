import { Injectable } from '@nestjs/common';
import { AbstracBookService } from './abstract-book.service';
import { AbstractPrismaService } from '../prisma/abstract-prisma.service';
import { AddAuthorsDto, BookIdDto,CreateBookDto } from './book-dtos';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { createError } from '../data-base-common-exceptions/exceptions-messages';

@Injectable()
export class BookService implements AbstracBookService {
    constructor(private readonly prisma: AbstractPrismaService) {}
    
    async createBook(book:CreateBookDto):Promise<BookIdDto> {
        
        try {        
            const bookId:BookIdDto = await this.prisma.book.create({
                    data:{
                        bookTitle:book.title,
                        coverUrl:book.coverUrl,
                    },select:{
                        bookId:true
                    }
                });

            return bookId;
        }catch (error:PrismaClientKnownRequestError | any) {
            throw createError(error.code || 'UNKNOWN_ERROR','Book');
        }

    }

    async addAuthors(addAuthorsDto:AddAuthorsDto):Promise<AddAuthorsDto> {
        const { bookId, authors } = addAuthorsDto;
        const addAuthorDtoArray = this.createAuthorDtoArray(bookId,authors); // [{bookId,authorId},{bookId,authorId}] bookId is the same for all authors

        try {
            //Create many ensures the transactionality of the operation
            await this.prisma.book_author.createMany({
                data:addAuthorDtoArray
            });

            return addAuthorsDto;

        }catch (error:PrismaClientKnownRequestError | any) {
            throw createError(error.code || 'UNKNOWN_ERROR','Book');
        }

    }

    private createAuthorDtoArray(bookId:string, authors:string[]) {
        return authors.map((author:string) => {
            return {
                bookId:bookId,
                authorId:author
            }
        });
    }
}
