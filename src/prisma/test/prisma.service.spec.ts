import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';
import { AbstractPrismaService } from '../abstract-prisma.service';
import { ConfigModule } from '@nestjs/config';
import { BookCreationResponseDto } from 'src/book/book-dtos';
import { Book } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { HttpException } from '@nestjs/common';
import { bookStub } from 'src/book/test/stubs/book.stubs';

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
      let bookId:BookCreationResponseDto;

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
        expect(bookId).toEqual({bookId:book.bookId});
      });
    });
  });

  describe('create an existing book',()=>{
    describe('when create an existing book',()=>{
      let bookId:BookCreationResponseDto;

      const book:Book= bookStub();

      beforeEach(async()=>{
        service.book.create = jest.fn().mockRejectedValue({
          code:'P2002'
        });

        try{
          bookId = await service.book.create({
            data:book
          });
        }catch(e:PrismaClientKnownRequestError | any){

        }

      });

      test('then it should throw an error',()=>{
        expect(()=>{
          throw new HttpException('Book already exists', 409);
        }).toThrow();
      });
    });
  });

});
