import { IsNotEmpty, IsString } from "class-validator";
import { IsStringWithoutNumbers } from "src/custom-validators";


export class CreateUserDto{
    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    @IsStringWithoutNumbers()
    userName: string;

    @IsString()
    @IsNotEmpty()
    @IsStringWithoutNumbers()
    userLastName: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}