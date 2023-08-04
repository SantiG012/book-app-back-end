import { CreateBookDto,BookIdDto, AddAuthorDto, BookInfoDto} from "./book-dtos";
import { CountDto, CoverUrlDto } from "src/global-dtos";


export abstract class AbstracBookService{
    abstract  createBook(book: CreateBookDto):Promise<BookIdDto>;
    abstract  addAuthors(addAuthorDto:AddAuthorDto[]):Promise<CountDto>;
    abstract findBooksById(bookIds:string[]):Promise<BookInfoDto[]>;
    abstract getBookIdsFromCollection(collectionIdDto:string):Promise<string[]>;
    abstract editBookCoverUrl(bookId:string, coverUrl:CoverUrlDto):Promise<BookIdDto>;
    abstract deleteBook(bookId:string):Promise<BookIdDto>;
}