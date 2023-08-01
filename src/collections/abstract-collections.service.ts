import { CountDto } from "src/global-dtos";
import { AddBookDto, CollectionIdDto, CollectionInfoDto, CreateCollectionDto } from "./dtos";

export abstract class AbstractCollectionsService {
    abstract createCollection(createCollectionDto:CreateCollectionDto, userId:string): Promise<CollectionIdDto>;
    abstract addBooks(addBooksDto: AddBookDto[]): Promise<CountDto>;
    abstract getCollections(sub: string): Promise<CollectionInfoDto[]>;
}