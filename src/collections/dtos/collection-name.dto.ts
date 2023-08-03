import { IsNotEmpty, IsString } from "class-validator";

export class CollectionNameDto {
    @IsNotEmpty()
    @IsString()
    collectionName:string;
}