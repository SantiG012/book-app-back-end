import { AuthorIdDto, CreateAuthorDto } from "../author-dtos";

export const sucessfulAuthorCreationStub = ():AuthorIdDto => {
    return {
        authorId: "a1b2c3d4e5f6g7h8i9j0k1l2",
    };
}

export const createAuthorStub =():CreateAuthorDto =>{
    return {
        authorName: "John",
        authorLastName: "Doe"
    }
}