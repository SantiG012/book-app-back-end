import { IsNotEmpty, IsString } from 'class-validator';

export class AddAuthorsDto {
    @IsNotEmpty()
    @IsString()
    bookId: string;

    @IsNotEmpty()
    @IsString()
    authors: string[];
}