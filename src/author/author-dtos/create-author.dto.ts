import { IsNotEmpty, IsString} from "class-validator";
import { IsStringWithoutNumbers } from "../../custom-validators/index";


export class CreateAuthorDto {
    @IsNotEmpty()
    @IsString()
    @IsStringWithoutNumbers()
    authorName: string;

    @IsNotEmpty()
    @IsString()
    @IsStringWithoutNumbers()
    authorLastName: string;
}