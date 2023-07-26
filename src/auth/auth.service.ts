import { Injectable } from '@nestjs/common';
import { AbstractAuthService } from './abstract-auth.service';
import { AbstractUserService } from 'src/user/abstract-user.service';
import { CreateUserDto, UserCredentialsDto } from 'src/user/user-dtos';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService implements AbstractAuthService{
    constructor(
        private readonly userService: AbstractUserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {}

    async singUp(createUserDto:CreateUserDto): Promise<{ access_token: string; }> {
        const userCredentials:UserCredentialsDto = await this.userService.createUser(createUserDto);

        const payload = this.createPayload(userCredentials);
        
        const secret = this.configService.get<string>('JWT_SECRET');

        const token = await this.jwtService.signAsync(
            payload,
            {
                expiresIn: '45m',
                secret: secret,
            }
        );

        return { access_token: token };
    }

    private createPayload(userCredentials:UserCredentialsDto){
        return {
            sub: userCredentials.userId,
            userName: userCredentials.userName,
            userLastName: userCredentials.userLastName,
        };
    }
}
