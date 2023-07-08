import { collectionIdStub } from "../tests/stubs";

export const CollectionsService = jest.fn().mockReturnValue({
    createCollection: jest.fn().mockResolvedValue(collectionIdStub())
});