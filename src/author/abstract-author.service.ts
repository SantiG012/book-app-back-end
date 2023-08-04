import { AuthorIdDto, AuthorInfoDto, CreateAuthorDto } from "./author-dtos";

export abstract class AbstractAuthorService {
    abstract createAuthor(createAuthorDto: CreateAuthorDto): Promise<AuthorIdDto>;
    abstract deleteAuthor(authorId: string): Promise<AuthorIdDto>;
    abstract getAuthorsIdByBookId(bookId: string): Promise<string[]>;
    abstract getAuthorsById(authorsId: string[]): Promise<AuthorInfoDto[]>;
}