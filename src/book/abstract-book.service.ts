import { BookCreationDto,BookCreationResponseDto } from "./book-dtos";
import { Book } from "@prisma/client";

export abstract class AbstracBookService{
    abstract  createBook(book: BookCreationDto):Promise<BookCreationResponseDto>;
}