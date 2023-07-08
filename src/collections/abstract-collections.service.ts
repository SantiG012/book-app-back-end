import { CollectionIdDto, CreateCollectionDto } from "./dtos";

export abstract class AbstractCollectionsService {
    abstract createCollection(createCollectionDto:CreateCollectionDto): Promise<CollectionIdDto>;
}