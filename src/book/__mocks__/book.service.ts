import { addedAuthorsDtoStub, sucessfulBookCreationStub } from "../test/stubs/index";

export const BookService = jest.fn().mockReturnValue({
    
    createBook: jest.fn().mockResolvedValue(sucessfulBookCreationStub()),
    addAuthors: jest.fn().mockResolvedValue(addedAuthorsDtoStub())

    
});