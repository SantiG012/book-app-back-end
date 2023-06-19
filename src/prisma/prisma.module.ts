import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { AbstractPrismaService } from './abstract-prisma.service';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [{
    provide: AbstractPrismaService,
    useClass: PrismaService
  }],
  exports: [AbstractPrismaService]
})
export class PrismaModule {}
