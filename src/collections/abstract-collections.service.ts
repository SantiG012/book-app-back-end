import { CountDto, CoverUrlDto } from "src/global-dtos";
import { CollectionBookDto, CollectionIdDto, CollectionInfoDto, CreateCollectionDto, CollectionNameDto } from "./dtos";

export abstract class AbstractCollectionsService {
    abstract createCollection(createCollectionDto:CreateCollectionDto, userId:string): Promise<CollectionIdDto>;
    abstract addBooks(addBooksDto: CollectionBookDto[]): Promise<CountDto>;
    abstract getCollections(sub: string): Promise<CollectionInfoDto[]>;
    abstract editCollectionName(collectionId:string, collectionNameDto:CollectionNameDto): Promise <CollectionIdDto>;
    abstract editCollectionCoverUrl(collectionId:string, coverUrl:CoverUrlDto): Promise <CollectionIdDto>;
    abstract deleteCollection(collectionId:string): Promise<CollectionIdDto>;
}