import { IsNotEmpty, IsString } from "class-validator";

export class CollectionBookDto {
    @IsString()
    @IsNotEmpty()
    bookId: string;
    
    @IsString()
    @IsNotEmpty()
    collectionId: string;
}