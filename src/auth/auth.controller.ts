import { Body, Controller, Post } from '@nestjs/common';
import { AbstractAuthService } from './abstract-auth.service';
import { CreateUserDto } from 'src/user/user-dtos';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService:AbstractAuthService
    ) {}

    @Post('signUp')
    async signUp(@Body() createUserDto:CreateUserDto): Promise<{access_token:string}> {
        return await this.authService.singUp(createUserDto);
    }
}
