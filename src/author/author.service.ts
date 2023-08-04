import { Injectable } from '@nestjs/common';
import { AbstractAuthorService } from './abstract-author.service';
import { CreateAuthorDto, AuthorIdDto, AuthorInfoDto } from './author-dtos';
import { AbstractPrismaService } from '../prisma/abstract-prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { createError } from '../data-base-common-exceptions/exceptions-messages';

@Injectable()
export class AuthorService implements AbstractAuthorService {
    constructor (
        private readonly prisma: AbstractPrismaService
    ) {}

    async createAuthor(createAuthorDto: CreateAuthorDto): Promise<AuthorIdDto> {

        try{
            const authorIdDto = this.prisma.author.create({
                data:createAuthorDto,
                select: {
                    authorId: true
                }
            });      
            
            return await authorIdDto;
             
        }catch(error:PrismaClientKnownRequestError | any) {
            throw createError(error.code || 'UNKNOWN_ERROR', 'Author');
        }
    }

    async deleteAuthor(authorId: string): Promise<AuthorIdDto> {
        try{
            const authorIdDto:AuthorIdDto = await this.prisma.author.delete({
                where: {
                    authorId
                },
                select: {
                    authorId: true
                }
            });

            return authorIdDto;

        }catch(error) {
            throw createError(error.code || 'UNKNOWN_ERROR', 'Author');
        }
    }

    async getAuthorsIdByBookId(bookId: string): Promise<string[]> {
        try{
            const authorsIdDto:AuthorIdDto[] = await this.prisma.book_author.findMany({
                where: {
                    bookId,
                    bookAuthorStatus: 'active'
                },
                select: {
                    authorId: true
                }
            });

            const authorsId:string[] = authorsIdDto.map(authorIdDto => authorIdDto.authorId);

            return authorsId;

        }catch(error){
            throw createError(error.code || 'UNKNOWN_ERROR', 'Author');
        }
    }

    async getAuthorsById(authorsId: string[]): Promise<AuthorInfoDto[]> {
        try{
            const authors:AuthorInfoDto[] = await this.prisma.author.findMany({
                where: {
                    authorId: {
                        in: authorsId
                    },
                    authorStatus: 'active'
                }
            });

            return authors;
        }catch(error){
            throw createError(error.code || 'UNKNOWN_ERROR', 'Author');
        }
    }
}
