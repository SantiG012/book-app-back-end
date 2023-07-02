import { AuthorIdDto, CreateAuthorDto } from "./author-dtos";

export abstract class AbstractAuthorService {
    abstract createAuthor(createAuthorDto: CreateAuthorDto): Promise<AuthorIdDto>;
}