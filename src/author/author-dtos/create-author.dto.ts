import { IsNotEmpty, IsString} from "class-validator";
import { IsStringWithoutNumbers } from "src/custom-validators/string-without-nambers.validator";


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