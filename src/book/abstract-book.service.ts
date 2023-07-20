import { CreateBookDto,BookIdDto, AddAuthorDto,AddedAuthorsDto } from "./book-dtos";


export abstract class AbstracBookService{
    abstract  createBook(book: CreateBookDto):Promise<BookIdDto>;
    abstract  addAuthors(addAuthorDto:AddAuthorDto[]):Promise<AddedAuthorsDto>;
}