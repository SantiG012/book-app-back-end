import { Body, Controller, Post,UseGuards } from '@nestjs/common';
import { CreateAuthorDto } from './author-dtos';
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
}