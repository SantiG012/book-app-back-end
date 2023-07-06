import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';
import { AbstractPrismaService } from '../abstract-prisma.service';
import { ConfigModule } from '@nestjs/config';
import { BookIdDto } from 'src/book/book-dtos';
import { Book } from '@prisma/client';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { bookStub, sucessfulBookCreationStub,repeatedBookExceptionStub } from '../../book/test/stubs/index';

jest.mock('../prisma.service');


describe('PrismaService', () => {
  let service: AbstractPrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [{
        provide: AbstractPrismaService,
        useClass: PrismaService
      }],
    }).compile();

    service = module.get<AbstractPrismaService>(AbstractPrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create a new book',()=>{
    describe('when create a new book',()=>{
      let bookId:BookIdDto;

      const book:Book= bookStub();

      beforeEach(async()=>{

        bookId = await service.book.create({
          data:book
        });
      });

      test('then it should call prisma.book.create',()=>{
        expect(service.book.create).toBeCalledWith({
          data:book
        });
      });

      test('then it should return a bookId',()=>{
        expect(bookId).toEqual(sucessfulBookCreationStub());
      });
    });
  });

  describe('create an existing book',()=>{
    describe('when create an existing book',()=>{
      let bookId:BookIdDto;

      const book:Book= bookStub();

      beforeEach(async()=>{
        service.book.create = jest.fn().mockRejectedValue(()=>{
          repeatedBookExceptionStub();
        });
      });

      test('then it should throw an error',async()=>{
        await expect(service.book.create({data:book})).rejects.toThrow(PrismaClientKnownRequestError);
      });
    });
  });

});
