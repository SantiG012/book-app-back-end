import {ExtractJwt, Strategy} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { Payload } from '../dtos';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt') {
    constructor(
        private readonly configService: ConfigService,
        private readonly prismaService: PrismaService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false, 
            secretOrKey: configService.get<string>('JWT_SECRET')
        });
    }

    validate(payload: Payload ):Payload {
        return payload;
    }
}