import { HttpException, Injectable } from '@nestjs/common';
import { AbstracBookService } from '../abstract-book.service';
import { AbstractPrismaService } from 'src/prisma/abstract-prisma.service';
import { BookCreationDto } from '../book-dtos';
import { v4 as uuidv4 } from "uuid";
import { Observable, catchError, from, throwError } from 'rxjs';
import { Book } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class BookService implements AbstracBookService {
    constructor(private readonly prisma: AbstractPrismaService) {}
    
    createBook(book:BookCreationDto):Observable<{bookId:string}> {
        const data = {
            bookId: uuidv4(),
            bookTitle: book.title,
            coverUrl: book.coverUrl,
            bookStatus:'active'
        };

        return from(this.prisma.book.create({
            data:data,
            select:{
                bookId:true
            }
        })).pipe(
            catchError((error:PrismaClientKnownRequestError)=>{
                return throwError(()=>this.createError(error.code))
            })
        );
    }

    private createError(erroCode:string):HttpException{
        if (erroCode === 'P2002') {
            return new HttpException('Book already exists', 409);
        }
        return new HttpException('Internal server error', 500)
    }
}
