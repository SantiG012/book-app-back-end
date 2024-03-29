import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BookModule } from './book/book.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthorModule } from './author/author.module';
import { CollectionsModule } from './collections/collections.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
    }),
    AuthModule, 
    BookModule, 
    PrismaModule, 
    AuthorModule, 
    CollectionsModule, 
    UserModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
