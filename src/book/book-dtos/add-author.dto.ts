import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString } from 'class-validator';

export class AddAuthorsDto {
    @IsNotEmpty()
    @IsString()
    bookId: string;

    @IsArray()
    @ArrayNotEmpty({message:"author's array should not be empty"})
    @IsString({ each: true })
    @IsNotEmpty({ each: true })
    authors: string[];
}