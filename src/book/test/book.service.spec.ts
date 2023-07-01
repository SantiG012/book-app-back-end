import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from '../book.service';
import { AbstracBookService } from '../abstract-book.service';
import { AbstractPrismaService } from '../../prisma/abstract-prisma.service';
import { PrismaService } from '../../prisma/prisma.service';
import { BookCreationDto, BookCreationResponseDto } from '../book-dtos';
import { bookStub } from '../../prisma/test/stubs/book.stub';
import { HttpException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';


jest.mock('../../prisma/prisma.service');


describe('BookService', () => {
  let service: AbstracBookService;
  let prismaService: AbstractPrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{
        provide: AbstracBookService,
        useClass: BookService
      },{
        provide: AbstractPrismaService,
        useClass: PrismaService
      }
      ]
    }).compile();

    service = module.get<AbstracBookService>(AbstracBookService);
    prismaService = module.get<AbstractPrismaService>(AbstractPrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create a book',()=>{
    describe('when create a book',()=>{
      let bookId:BookCreationResponseDto;

      const bookDto:BookCreationDto =  {
        title:'1984',
        coverUrl:''
      }

      beforeEach(async ()=>{
        bookId = await service.createBook(bookDto);
      })

      test('then it should return a bookId', () => {
        expect(bookId).toEqual(bookStub());
      });

    })
  })

  describe('create an existing book',()=>{
    describe('when create an existing book',()=>{
      const bookDto:BookCreationDto =  {
        title:'1984',
        coverUrl:''
      }

    
      beforeEach(async ()=>{
        prismaService.book.create = jest.fn().mockImplementation(()=>{
          throw new PrismaClientKnownRequestError('Unique constraint',{
            code:'P2002',
            clientVersion:'2.19.0',
            meta:{
              target:['bookId']
            }
          });
        })

      });


      test('then it should throw an error', async () => {
        await expect(service.createBook(bookDto)).rejects.toThrow(HttpException);
      });
    });

  });
});
