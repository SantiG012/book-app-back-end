import { CollectionIdDto } from "src/collections/dtos";
import { CreateBookDto,BookIdDto, AddAuthorDto, BookInfoDto} from "./book-dtos";
import { CountDto } from "src/global-dtos";


export abstract class AbstracBookService{
    abstract  createBook(book: CreateBookDto):Promise<BookIdDto>;
    abstract  addAuthors(addAuthorDto:AddAuthorDto[]):Promise<CountDto>;
    abstract findBooksById(bookIds:string[]):Promise<BookInfoDto[]>;
    abstract getBookIdsFromCollection(collectionIdDto:CollectionIdDto):Promise<string[]>;
}