import { CreateBookDto, BookIdDto, AddAuthorDto } from "src/book/book-dtos";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Book } from '@prisma/client';

export const sucessfulBookCreationStub = ():BookIdDto => {
    const bookId:BookIdDto = {
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

export const bookCreationDtoStub = ():CreateBookDto => {
    const bookCreationDto:CreateBookDto = {
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

export const addAuthorDtoStub = ():AddAuthorDto => {
    const addAuthorsDto:AddAuthorDto = {
        bookId:'bookId',
        authorId:'authorId'
    }

    return addAuthorsDto;
};
