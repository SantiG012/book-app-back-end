import { Injectable } from '@nestjs/common';
import { AbstracBookService } from './abstract-book.service';
import { AbstractPrismaService } from '../prisma/abstract-prisma.service';
import { AddAuthorDto, BookIdDto,BookInfoDto,CreateBookDto } from './book-dtos';
import { CountDto, CoverUrlDto } from 'src/global-dtos';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { createError } from '../data-base-common-exceptions/exceptions-messages';
import { CollectionIdDto } from 'src/collections/dtos';

@Injectable()
export class BookService implements AbstracBookService {
    constructor(private readonly prisma: AbstractPrismaService) {}
    
    async createBook(book:CreateBookDto):Promise<BookIdDto> {
        
        try {        
            const bookId:BookIdDto = await this.prisma.book.create({
                    data:book
                    ,select:{
                        bookId:true
                    }
                });

            return bookId;
        }catch (error:PrismaClientKnownRequestError | any) {
            throw createError(error.code || 'UNKNOWN_ERROR','Book');
        }

    }

    async addAuthors(addAuthorDto:AddAuthorDto[]):Promise<CountDto> {

        try{
            const resultCount = this.prisma.book_author.createMany({
                data:addAuthorDto
            })

            return await resultCount;
        } catch (error:PrismaClientKnownRequestError | any) {

            throw createError(error.code || 'UNKNOWN_ERROR','Authors');
        }

    }

    async findBooksById(bookIds:string[]):Promise<BookInfoDto[]>{

        try{
            const books:BookInfoDto[] = await this.prisma.book.findMany({
                where:{
                    bookId:{
                        in:bookIds
                    },
                    bookStatus:'active'
                }
            });

            return books;
        }catch(error){
            throw createError(error.code || 'UNKNOWN_ERROR','Book');
        }
    }

    async getBookIdsFromCollection(collectionIdParam: string): Promise<string[]> {
        try{
            
            const bookIdsDto:BookIdDto[] = await this.prisma.collections_book.findMany({
                where:{
                    collectionId:collectionIdParam,
                    collectionsBookStatus:'active'
                },
                select:{
                    bookId:true
                }
            });

            const bookIds:string[] = bookIdsDto.map(bookIdDto => bookIdDto.bookId);

            return bookIds;

        }catch(error){
            throw createError(error.code || 'UNKNOWN_ERROR','Book');
        }
    }

    async editBookCoverUrl(bookId:string, coverUrl:CoverUrlDto): Promise<BookIdDto> {

        try{
            const bookIdDto:BookIdDto = await this.prisma.book.update({
                where:{
                    bookId
                },
                data:coverUrl,
                select:{
                    bookId:true
                }
            })

            return bookIdDto

        }catch(error){
            throw createError(error.code || 'UNKNOWN_ERROR',"book's cover url");
        }
    }

    async deleteBook(bookId:string): Promise<BookIdDto> {
        try{
            const bookIdDto:BookIdDto = await this.prisma.book.update({
                where:{
                    bookId
                },
                data:{
                    bookStatus:'inactive'
                },
                select:{
                    bookId:true
                }
            })

            return bookIdDto

        }catch(error){
            throw createError(error.code || 'UNKNOWN_ERROR',"book's cover url");
        }
    }
}
