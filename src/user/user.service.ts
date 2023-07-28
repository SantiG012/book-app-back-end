import { Injectable } from '@nestjs/common';
import { AbstractPrismaService } from '../prisma/abstract-prisma.service';
import { AbstractUserService } from './abstract-user.service';
import { CreateUserDto, LogInDto, UserCredentialsDto, UserIdDto } from './user-dtos';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { createError } from '../data-base-common-exceptions/exceptions-messages';
import { User } from '@prisma/client';

@Injectable()
export class UserService implements AbstractUserService{

    constructor(private readonly prismaService: AbstractPrismaService) {}

    async createUser(createUserDto:CreateUserDto): Promise<UserCredentialsDto> {
        const hash = await argon.hash(createUserDto.password);

        try{
            const user = await this.prismaService.user.create({
                data:{
                    userId: createUserDto.userId,
                    userName: createUserDto.userName,
                    userLastName: createUserDto.userLastName,
                    password: hash
                }
            });

            delete user.password;

            return user;

        } catch (error:PrismaClientKnownRequestError | any) {
            throw createError(error.code || 'UNKNOWN_ERROR','User');
        }
    }

    async getUser(userIdDto:UserIdDto): Promise<User> {
        try{
            const user:User = await this.prismaService.user.findFirst({
                where:{
                    userId: userIdDto.userId,
                    userStatus: 'active'
                }
            });

            return user;
        } catch (error:PrismaClientKnownRequestError | any) {
            throw createError(error.code || 'UNKNOWN_ERROR','User');
        }
    }
}
