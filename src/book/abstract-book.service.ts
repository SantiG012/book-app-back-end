import { Observable } from "rxjs";
import { BookCreationDto } from "./book-dtos";
import { Book } from "@prisma/client";

export abstract class AbstracBookService{
    abstract createBook(book: BookCreationDto):Observable<Book>;
}