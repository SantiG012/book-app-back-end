import { CreateUserDto } from "src/user/user-dtos";

export abstract class AbstractAuthService {
    abstract singUp(createUserDto:CreateUserDto):Promise<{access_token:string}>;
}
