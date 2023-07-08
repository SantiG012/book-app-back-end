import { IsNotEmpty, IsString } from "class-validator";

export class CollectionIdDto {
    @IsString()
    @IsNotEmpty()
    collectionId: string;
}