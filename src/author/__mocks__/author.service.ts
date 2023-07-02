import { sucessfulAuthorCreationStub } from "../test/author.stubs";

export const AuthorService = jest.fn().mockReturnValue({
    createAuthor: jest.fn().mockResolvedValue(sucessfulAuthorCreationStub())
});