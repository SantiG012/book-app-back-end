import { BookCreationResponseDto } from "src/book/book-dtos";

export const bookStub = ():BookCreationResponseDto => {
    const bookId:BookCreationResponseDto = {
        bookId:'bookId'
    }

    return bookId;
}