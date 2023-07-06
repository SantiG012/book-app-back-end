import { CreateBookDto,BookIdDto, AddAuthorDto } from "./book-dtos";


export abstract class AbstracBookService{
    abstract  createBook(book: CreateBookDto):Promise<BookIdDto>;
    abstract  addAnAuthor(addAuthorDto:AddAuthorDto):Promise<AddAuthorDto>;
}