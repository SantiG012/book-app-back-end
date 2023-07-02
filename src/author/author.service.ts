import { Injectable } from '@nestjs/common';
import { AbstractAuthorService } from './abstract-author.service';
import { CreateAuthorDto, AuthorIdDto } from './author-dtos';
import { AbstractPrismaService } from '../prisma/abstract-prisma.service';
import { v4 as uuidv4 } from "uuid";
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { createError } from '../data-base-common-exceptions/exceptions-messages';

@Injectable()
export class AuthorService implements AbstractAuthorService {
    constructor (
        private readonly prisma: AbstractPrismaService
    ) {}

    async createAuthor(createAuthorDto: CreateAuthorDto): Promise<AuthorIdDto> {
        const data = this.createAuthorObject(createAuthorDto);
        let authorIdDto:AuthorIdDto;

        try{
            authorIdDto = await this.prisma.author.create({
                data:data,
                select: {
                    authorId: true
                }
            });           
             
        }catch(error:PrismaClientKnownRequestError | any) {
            throw createError(error.code || 'UNKNOWN_ERROR', 'Author');
        }

        return authorIdDto;

    }

    private createAuthorObject(createAuthorDto: CreateAuthorDto) {
        return {
            authorId: uuidv4(),
            authorName: createAuthorDto.authorName,
            authorLastName: createAuthorDto.authorLastName,
            authorStatus: 'active'
        };
    }
}
