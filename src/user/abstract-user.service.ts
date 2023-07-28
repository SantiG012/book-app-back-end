import { User } from "@prisma/client";
import { CreateUserDto, LogInDto, UserCredentialsDto, UserIdDto } from "./user-dtos";

export abstract class AbstractUserService {
    abstract createUser(createUserDto:CreateUserDto): Promise<UserCredentialsDto>;
    abstract getUser(userIdDto:UserIdDto): Promise<User>;
}