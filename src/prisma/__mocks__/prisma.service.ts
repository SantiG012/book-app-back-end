import { collectionIdStub } from "../../collections/tests/stubs";
import { sucessfulBookCreationStub } from "../../book/test/stubs/index";

export const PrismaService = jest.fn().mockReturnValue({
    book: {
        create: jest.fn().mockResolvedValue(sucessfulBookCreationStub())
    },
    collections: {
        create: jest.fn().mockResolvedValue(collectionIdStub())
    }
});