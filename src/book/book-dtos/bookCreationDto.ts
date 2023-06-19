import { IsNotEmpty, IsString, ValidateIf } from "class-validator";

export class BookCreationDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @ValidateIf((o) => {return ((o.coverUrl !== undefined) || (o.coverUrl !== null))})
    @IsString()
    coverUrl: string | null;
}

export interface BookCreationResponseDto {
    bookId: string;
}
