import { Body, Controller, Post } from '@nestjs/common';
import { CreateAuthorDto } from './author-dtos';
import { AbstractAuthorService } from './abstract-author.service';

@Controller('author')
export class AuthorController {
    constructor(
        private readonly authorService: AbstractAuthorService
    ) {}

    @Post('createAuthor')
    async createAuthor(@Body() createAuthorDto: CreateAuthorDto) {
        return await this.authorService.createAuthor(createAuthorDto);
    }
}
