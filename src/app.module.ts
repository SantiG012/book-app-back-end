import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BookModule } from './book/book.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthorModule } from './author/author.module';
import { CollectionsModule } from './collections/collections.module';

@Module({
  imports: [AuthModule, BookModule, PrismaModule, AuthorModule, CollectionsModule],
  controllers: [],
  providers: []
})
export class AppModule {}
