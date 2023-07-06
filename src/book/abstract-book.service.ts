import { CreateBookDto,BookIdDto } from "./book-dtos";


export abstract class AbstracBookService{
    abstract  createBook(book: CreateBookDto):Promise<BookIdDto>;
}