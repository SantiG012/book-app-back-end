import { BookCreationDto,BookCreationResponseDto } from "./book-dtos";


export abstract class AbstracBookService{
    abstract  createBook(book: BookCreationDto):Promise<BookCreationResponseDto>;
}