import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { AbstracBookService } from './abstract-book.service';

@Module({
  controllers: [BookController],
  providers: [{
    provide: AbstracBookService,
    useClass: BookService
  }]
})
export class BookModule {}
