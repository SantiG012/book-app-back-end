import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AbstractPrismaService } from '../abstract-prisma.service';

@Injectable()
export class PrismaService extends AbstractPrismaService {
    constructor(private readonly configService: ConfigService) {
        super({
            datasources: {
                db: {
                    url: configService.get('DATABASE_URL'),
                },
            },
        });
    }

    cleanDb(): void {
        //TODO: implement
    }
}
