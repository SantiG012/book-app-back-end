import { Body, Controller, Get, Param, Post,Put,UseGuards } from '@nestjs/common';
import { AuthorIdDto, AuthorInfoDto, CreateAuthorDto } from './author-dtos';
import { AbstractAuthorService } from './abstract-author.service';
import { JwtAuthGuard } from 'src/auth/guards';

@UseGuards(JwtAuthGuard)
@Controller('author')
export class AuthorController {
    constructor(
        private readonly authorService: AbstractAuthorService
    ) {}

    @Post('createAuthor')
    async createAuthor(@Body() createAuthorDto: CreateAuthorDto) {
        return await this.authorService.createAuthor(createAuthorDto);
    }

    @Put('deleteAuthor/:authorId')
    async deleteAuthor(@Param('authorId') authorId: string):Promise<AuthorIdDto> {
        return await this.authorService.deleteAuthor(authorId);
    }

    @Get('getAuthorsByBookId/:bookId')
    async getAuthorsByBookId(@Param('bookId') bookId: string): Promise<AuthorInfoDto[]> {
        const authorsId:string[] = await this.authorService.getAuthorsIdByBookId(bookId);
        const authors:AuthorInfoDto[] = await this.authorService.getAuthorsById(authorsId);

        return authors;
    }
}