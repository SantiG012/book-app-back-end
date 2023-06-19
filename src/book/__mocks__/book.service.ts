import {bookStub} from '../test/stubs/book.stub';

export const BookService = jest.fn().mockReturnValue({
    createBook: jest.fn().mockResolvedValue(bookStub())
})