import { CreateBookDto,BookCreationResponseDto } from "./book-dtos";


export abstract class AbstracBookService{
    abstract  createBook(book: CreateBookDto):Promise<BookCreationResponseDto>;
}