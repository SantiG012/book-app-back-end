import { Module } from '@nestjs/common';
import { AuthorController } from './author.controller';
import { AuthorService } from './author.service';
import { AbstractAuthorService } from './abstract-author.service';

@Module({
  controllers: [AuthorController],
  providers: [{
    provide: AbstractAuthorService,
    useClass: AuthorService
  }]
})
export class AuthorModule {}
