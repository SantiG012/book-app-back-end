import { IsNotEmpty, IsString, ValidateIf } from "class-validator";

export class CreateBookDto {
    @IsNotEmpty()
    @IsString()
    bookTitle: string;

    @ValidateIf((o) => {return ((o.coverUrl !== undefined) || (o.coverUrl !== null))})
    @IsString()
    coverUrl: string | null;
}
