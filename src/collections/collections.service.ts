import { Injectable } from '@nestjs/common';
import { AbstractCollectionsService } from './abstract-collections.service';
import { CreateCollectionDto, CollectionIdDto } from './dtos';
import { AbstractPrismaService } from 'src/prisma/abstract-prisma.service';
import { v4 as uuidv4 } from "uuid";
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { createError } from '../data-base-common-exceptions/exceptions-messages';
import { create } from 'domain';

@Injectable()
export class CollectionsService implements AbstractCollectionsService {
    constructor(
        private readonly prismaService:AbstractPrismaService
    ) {}

    async createCollection(createCollectionDto: CreateCollectionDto): Promise<CollectionIdDto> {
        const data = this.createCollectionObject(createCollectionDto);
        let collection:CollectionIdDto;

        try{
             collection = await this.prismaService.collections.create({
                    data: data,
                    select: {
                        collectionId: true
                    }
                });
        }catch(error:PrismaClientKnownRequestError | any){
            throw createError(error.code || 'UNKNOWN_ERROR','Collection');
        }

        return collection;
    }

    private createCollectionObject(createCollectionDto:CreateCollectionDto){
        return {
            collectionId: uuidv4(),
            collectionName: createCollectionDto.collectionName,
            userId: createCollectionDto.userId,
            coverUrl: createCollectionDto.coverUrl,
            collectionStatus:'active'
        }
    }

}
