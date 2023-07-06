import { IsNotEmpty, IsString } from 'class-validator';

export class AddAuthorDto {
    @IsNotEmpty()
    @IsString()
    bookId: string;

    @IsNotEmpty()
    @IsString()
    authorId: string;
}