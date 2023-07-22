import { IsNotEmpty, IsString, ValidateIf } from "class-validator";

export class CreateCollectionDto {
    @IsString()
    @IsNotEmpty()
    collectionName: string;

    @IsString()
    @IsNotEmpty()
    userId: string;
    
    @ValidateIf((o) => {return ((o.coverUrl !== undefined) || (o.coverUrl !== null))})
    @IsString()
    coverUrl: string;
}


