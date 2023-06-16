import { Module } from '@nestjs/common';
import { PrismaService } from './prisma-service/prisma.service';
import { AbstractPrismaService } from './abstract-prisma.service';

@Module({
  providers: [{
    provide: AbstractPrismaService,
    useClass: PrismaService
  }]
})
export class PrismaModule {}
