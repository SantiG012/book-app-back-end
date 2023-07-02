import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BookModule } from './book/book.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthorModule } from './author/author.module';

@Module({
  imports: [AuthModule, BookModule, PrismaModule, AuthorModule],
  controllers: [],
  providers: []
})
export class AppModule {}
