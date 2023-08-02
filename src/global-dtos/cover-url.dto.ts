import { IsNotEmpty, IsString } from "class-validator";

export class CoverUrlDto {
    @IsNotEmpty()
    @IsString()
    coverUrl:string;
}