import { ForbiddenException, Injectable } from '@nestjs/common';
import { AbstractAuthService } from './abstract-auth.service';
import { AbstractUserService } from 'src/user/abstract-user.service';
import { CreateUserDto, LogInDto, UserCredentialsDto, UserIdDto } from 'src/user/user-dtos';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import * as argon from 'argon2';
import { Payload } from './dtos';

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

    async signIn(logInDto:LogInDto): Promise<{ access_token: string; }> {
        const userIdDto:UserIdDto = { userId: logInDto.userId };

        const user:User = await this.userService.getUser(userIdDto);

        const isPasswordValid = await argon.verify(user.password, logInDto.password);

        if(!isPasswordValid){
            throw new ForbiddenException('Invalid credentials');
        }

        const token:string = await this.generateToken(this.createPayload(user));

        return { access_token: token };
    }

    private createPayload(user:{userId:string, userName:string, userLastName:string}): Payload {
        return {
            sub: user.userId,
            userName: user.userName,
            userLastName: user.userLastName,
        };
    }

    private async generateToken(payload: Payload): Promise<string> {
        return await this.jwtService.signAsync(
            payload,
            {
                expiresIn: '45m',
                secret: this.configService.get<string>('JWT_SECRET'),
            }
        );
    }
}
