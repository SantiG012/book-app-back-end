import { Injectable } from '@nestjs/common';
import { AbstractCollectionsService } from './abstract-collections.service';
import { CreateCollectionDto, CollectionIdDto, AddBookDto } from './dtos';
import { AbstractPrismaService } from '../prisma/abstract-prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { createError } from '../data-base-common-exceptions/exceptions-messages';
import { CountDto } from 'src/global-dtos';


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

    async addBooks(addBooksDto: AddBookDto[]): Promise<CountDto> {
        try{
            const count:CountDto = await this.prismaService.collections_book.createMany({
                data: addBooksDto
            })

            return count;
        } catch (error){
            throw createError(error.code?error.code:'UNKNOWN_ERROR','Collection');
        }
    }
}
