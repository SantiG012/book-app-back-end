import { IsNotEmpty, IsString } from "class-validator";

export class AddBookDto {
    @IsString()
    @IsNotEmpty()
    bookId: string;
    
    @IsString()
    @IsNotEmpty()
    collectionId: string;
}