import { AuthorIdDto, CreateAuthorDto } from "./author-dtos";

export abstract class AbstractAuthorService {
    abstract createAuthor(createAuthorDto: CreateAuthorDto): Promise<AuthorIdDto>;
    abstract deleteAuthor(authorId: string): Promise<AuthorIdDto>;
}