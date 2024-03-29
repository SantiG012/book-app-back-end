import { Injectable } from '@nestjs/common';
import { AbstractCollectionsService } from './abstract-collections.service';
import { CreateCollectionDto, CollectionIdDto, CollectionBookDto, CollectionInfoDto, CollectionNameDto } from './dtos';
import { AbstractPrismaService } from '../prisma/abstract-prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { createError } from '../data-base-common-exceptions/exceptions-messages';
import { CountDto, CoverUrlDto } from 'src/global-dtos';


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
                    userId: sub,
                    collectionStatus: 'active'
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

    async editCollectionName(collectionId: string, collectionNameDto: CollectionNameDto): Promise<CollectionIdDto> {
        try{
            const collectionIdDto:CollectionIdDto = await this.prismaService.collections.update({
                where:{
                    collectionId
                },
                data:collectionNameDto,
                select:{
                    collectionId:true
                }
            })

            return collectionIdDto
            
        } catch(error){
            throw createError(error.code || 'UNKNOWN_ERROR', "collection's name")
        }
    }

    async editCollectionCoverUrl(collectionId: string, coverUrl: CoverUrlDto): Promise<CollectionIdDto> {
        try{
            const collectionIdDto:CollectionIdDto = await this.prismaService.collections.update({
                where:{
                    collectionId
                },
                data:coverUrl,
                select:{
                    collectionId:true
                }
            })

            return collectionIdDto
            
        } catch(error){
            throw createError(error.code || 'UNKNOWN_ERROR', "collection's cover url")
        }
    }

    async deleteCollection(collectionId: string): Promise<CollectionIdDto> {
        try{
            const collectionIdDto:CollectionIdDto = await this.prismaService.collections.update({
                where:{
                    collectionId
                },
                data:{
                    collectionStatus: 'inactive'
                },
                select:{
                    collectionId:true
                }
            })

            return collectionIdDto
            
        } catch(error){
            throw createError(error.code || 'UNKNOWN_ERROR', "collection")
        }
    }
}
