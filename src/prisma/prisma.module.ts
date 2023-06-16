import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma-service/prisma.service';
import { AbstractPrismaService } from './abstract-prisma.service';

@Global()
@Module({
  providers: [{
    provide: AbstractPrismaService,
    useClass: PrismaService
  }]
})
export class PrismaModule {}
