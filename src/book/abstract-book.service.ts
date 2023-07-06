import { CreateBookDto,BookIdDto, AddAuthorsDto } from "./book-dtos";


export abstract class AbstracBookService{
    abstract  createBook(book: CreateBookDto):Promise<BookIdDto>;
    abstract  addAnAuthor(addAuthorDto:AddAuthorsDto):Promise<AddAuthorsDto>;
}