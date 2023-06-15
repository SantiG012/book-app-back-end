import { Module } from '@nestjs/common';
import { BookController } from './book-controller/book.controller';
import { BookService } from './book-service/book.service';

@Module({
  controllers: [BookController],
  providers: [BookService]
})
export class BookModule {}
