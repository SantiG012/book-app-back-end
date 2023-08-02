import { Injectable } from '@nestjs/common';
import { AbstractCollectionsService } from './abstract-collections.service';
import { CreateCollectionDto, CollectionIdDto, CollectionBookDto, CollectionInfoDto } from './dtos';
import { AbstractPrismaService } from '../prisma/abstract-prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { createError } from '../data-base-common-exceptions/exceptions-messages';
import { CountDto } from 'src/global-dtos';
import { BookIdDto } from 'src/book/book-dtos';


@Injectable()
export class CollectionsService implements AbstractCollectionsService {
    constructor(
        private readonly prismaService:AbstractPrismaService
    ) {}

    async createCollection(createCollectionDto: CreateCollectionDto, sub:string): Promise<CollectionIdDto> {
        try{
            const collection =  this.prismaService.collections.create({
                data: {
                    userId: sub,
                    collectionName: createCollectionDto.collectionName,
                    coverUrl: createCollectionDto.coverUrl,
                },
                select: {
                    collectionId: true
                }
            });

            return await collection;
        }catch(error:PrismaClientKnownRequestError | any){

            throw createError(error.code || 'UNKNOWN_ERROR','Collection');
        }
    }

    async addBooks(addBooksDto: CollectionBookDto[]): Promise<CountDto> {
        try{
            const count:CountDto = await this.prismaService.collections_book.createMany({
                data: addBooksDto
            })

            return count;
        } catch (error){
            throw createError(error.code?error.code:'UNKNOWN_ERROR','Collection');
        }
    }

    async getCollections(sub: string): Promise<CollectionInfoDto[]> {
        
        try{
            const collections = await this.prismaService.collections.findMany({
                where: {
                    userId: sub
                },
                select: {
                    collectionId: true,
                    collectionName: true,
                    coverUrl: true
                }
            });

            return collections;

        }catch(error){
            throw createError(error.code?error.code:'UNKNOWN_ERROR','Collection');
        }
    }

    async getBooksByCollectionId(collectionIdDto: CollectionIdDto): Promise<string[]> {
        try{
            const booksIdsDto:BookIdDto[] = await this.prismaService.collections_book.findMany({
                where: {
                    collectionId: collectionIdDto.collectionId
                },
                select:{
                    bookId:true
                },
            });

            const booksIds:string[] = booksIdsDto.map(bookIdDto => bookIdDto.bookId);

            return booksIds;

        }catch(error){
            throw createError(error.code || 'UNKNOWN_ERROR','Collection');
        }
    }
}
