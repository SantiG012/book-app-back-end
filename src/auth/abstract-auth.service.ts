import { CreateUserDto, LogInDto } from "src/user/user-dtos";

export abstract class AbstractAuthService {
    abstract singUp(createUserDto:CreateUserDto):Promise<{access_token:string}>;
    abstract signIn(logInDto:LogInDto):Promise<{access_token:string}>;
}
