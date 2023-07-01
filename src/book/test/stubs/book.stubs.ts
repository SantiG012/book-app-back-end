import { BookCreationDto, BookCreationResponseDto } from "src/book/book-dtos";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { Book } from '@prisma/client';

export const sucessfulBookCreationStub = ():BookCreationResponseDto => {
    const bookId:BookCreationResponseDto = {
        bookId:'bookId'
    }

    return bookId;
}

export const repeatedBookExceptionStub = () => {
    throw new PrismaClientKnownRequestError('Unique constraint',{
        code:'P2002',
        clientVersion:'2.19.0',
        meta:{
          target:['bookId']
        }
    });
}

export const bookCreationDtoStub = ():BookCreationDto => {
    const bookCreationDto:BookCreationDto = {
        title:'1984',
        coverUrl:''
    }

    return bookCreationDto;
}



export const bookStub = ():Book => {
    const book:Book= {
        bookId:'bookId',
        bookTitle:'1984',
        coverUrl:null,
        bookStatus:'active'
    }

    return book;
}
