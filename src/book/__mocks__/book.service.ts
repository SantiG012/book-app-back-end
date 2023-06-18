import {bookStub} from '../test/stubs/book.stub';
import { of} from 'rxjs';

export const BookService = jest.fn().mockReturnValue({
    createBook: jest.fn().mockResolvedValue(of(bookStub()))
})