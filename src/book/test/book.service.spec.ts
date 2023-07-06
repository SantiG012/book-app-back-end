import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from '../book.service';
import { AbstracBookService } from '../abstract-book.service';
import { AbstractPrismaService } from '../../prisma/abstract-prisma.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBookDto, BookCreationResponseDto} from '../book-dtos';
import { bookCreationDtoStub, sucessfulBookCreationStub } from './stubs/index';
import { HttpException } from '@nestjs/common';
import { repeatedResourceExceptionStub } from '../../data-base-common-exceptions/repeated-exceptions';

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

      const bookCreationDto:CreateBookDto = bookCreationDtoStub();

      beforeEach(async ()=>{
        bookId = await service.createBook(bookCreationDto);
      })

      test('then it should return a bookId', () => {
        expect(bookId).toEqual(sucessfulBookCreationStub());
      });

    })
  })

  describe('create an existing book',()=>{
    describe('when create an existing book',()=>{
      const bookCreationDto:CreateBookDto = bookCreationDtoStub();

    
      beforeEach(async ()=>{
        prismaService.book.create = jest.fn().mockImplementation(()=>{
          repeatedResourceExceptionStub();
        })

      });


      test('then it should throw an error', async () => {
        await expect(service.createBook(bookCreationDto)).rejects.toThrow(HttpException);
      });
    });

  });
});
