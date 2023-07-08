import { IsNotEmpty, IsString } from "class-validator";

export class CreateCollectionDto {
    @IsString()
    @IsNotEmpty()
    collectionName: string;
    
    @IsString()
    @IsNotEmpty()
    coverUrl: string;
}


