import { sucessfulBookCreationStub } from "../../book/test/stubs/index";

export const PrismaService = jest.fn().mockReturnValue({
    book: {
        create: jest.fn().mockResolvedValue(sucessfulBookCreationStub())
    }
});