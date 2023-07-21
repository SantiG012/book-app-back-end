import { Injectable } from '@nestjs/common';
import { AbstractCollectionsService } from './abstract-collections.service';
import { CreateCollectionDto, CollectionIdDto } from './dtos';
import { AbstractPrismaService } from '../prisma/abstract-prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { createError } from '../data-base-common-exceptions/exceptions-messages';


@Injectable()
export class CollectionsService implements AbstractCollectionsService {
    constructor(
        private readonly prismaService:AbstractPrismaService
    ) {}

    async createCollection(createCollectionDto: CreateCollectionDto): Promise<CollectionIdDto> {
        try{
            const collection =  this.prismaService.collections.create({
                data: createCollectionDto,
                select: {
                    collectionId: true
                }
            });

            return await collection;
        }catch(error:PrismaClientKnownRequestError | any){
            throw createError(error.code || 'UNKNOWN_ERROR','Collection');
        }
    }
}
