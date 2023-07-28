import { IsNotEmpty, IsString } from "class-validator";

export class LogInDto{
    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}