import { bookStub } from "../test/stubs/book.stub";

export const PrismaService = jest.fn().mockReturnValue({
    book: {
        create: jest.fn().mockResolvedValue(bookStub())
    }
});