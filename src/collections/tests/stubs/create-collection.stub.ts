import { CreateCollectionDto } from "../../dtos/index";

export const createCollectionStub = (): CreateCollectionDto => {
    const createCollectionDto: CreateCollectionDto = {
        collectionName: 'Fiction',
        userId: 'userId',
        coverUrl: 'coverUrl'
    }

    return createCollectionDto;
};