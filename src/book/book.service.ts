import { Injectable } from '@nestjs/common';
import { AbstracBookService } from './abstract-book.service';
import { AbstractPrismaService } from '../prisma/abstract-prisma.service';
import { AddAuthorDto, BookIdDto,CreateBookDto } from './book-dtos';
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

    async addAuthors(addAuthorDto:AddAuthorDto[]):Promise<AddAuthorDto[]> {

        try{
            await this.prisma.book_author.createMany({
                data:addAuthorDto
            })

            return addAuthorDto;
        } catch (error:PrismaClientKnownRequestError | any) {

            throw createError(error.code || 'UNKNOWN_ERROR','Authors');
        }

    }
}
