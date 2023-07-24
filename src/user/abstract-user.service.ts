import { CreateUserDto, UserCredentialsDto } from "./user-dtos";

export abstract class AbstractUserService {
    abstract createUser(createUserDto:CreateUserDto): Promise<UserCredentialsDto>;
}