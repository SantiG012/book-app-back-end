import { CreateBookDto,BookIdDto, AddAuthorDto} from "./book-dtos";
import { CountDto } from "src/global-dtos";


export abstract class AbstracBookService{
    abstract  createBook(book: CreateBookDto):Promise<BookIdDto>;
    abstract  addAuthors(addAuthorDto:AddAuthorDto[]):Promise<CountDto>;
}