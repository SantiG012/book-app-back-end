import { CreateCollectionDto } from "../../dtos/index";

export const createCollectionStub = (): CreateCollectionDto => {
    const createCollectionDto: CreateCollectionDto = {
        collectionName: 'Fiction',
        coverUrl: 'coverUrl'
    }

    return createCollectionDto;
};