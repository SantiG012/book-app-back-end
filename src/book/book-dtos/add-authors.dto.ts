import {IsNotEmpty, IsString } from 'class-validator';

export class AddAuthorDto {
    @IsNotEmpty()
    @IsString()
    bookId: string;

    @IsString()
    @IsNotEmpty()
    authorId: string;
}