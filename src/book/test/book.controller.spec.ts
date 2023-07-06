import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from '../book.controller';
import { BookService } from '../book.service';
import { AbstracBookService } from '../abstract-book.service';
import { CreateBookDto,BookCreationResponseDto } from '../book-dtos/create-book.dto';
import { bookCreationDtoStub, sucessfulBookCreationStub } from './stubs/index';
import { HttpException } from '@nestjs/common';
import { badRequestException } from '../../data-base-common-exceptions/repeated-http-exceptions';

jest.mock('../book.service');

describe('BookController', () => {
  let bookController: BookController;
  let bookService: AbstracBookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [{
        provide: AbstracBookService,
        useClass: BookService
      }]
    }).compile();

    bookController = module.get<BookController>(BookController);
    bookService = module.get<AbstracBookService>(AbstracBookService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(bookController).toBeDefined();
  });

  describe('create book', () => {
    describe ('when create book', () => {
      let bookId:BookCreationResponseDto;

      const bookDto:CreateBookDto = bookCreationDtoStub();

      beforeEach(async () => {
        bookId = await bookController.createBook(bookDto);
      });

      test('then it should call bookService', () => {
        expect(bookService.createBook).toBeCalledWith(bookDto);
      });

      test('then it should return a bookId', () => {
        expect(bookId).toEqual(sucessfulBookCreationStub());
      });

    });
  });

  describe('create an existing book',()=>{
    describe('when create an existing book', ()=>{

      beforeEach(async ()=>{
        bookService.createBook = jest.fn().mockResolvedValue(()=>{
          throw badRequestException('Book');
        })
      });

      test('then it should throw an error',async()=>{
        try{
          await bookController.createBook(bookCreationDtoStub());
        } catch(error:HttpException | any){
          const message = 'Book already exists';
          const status = 400;
          
          expect(error.message).toBe(message);
          expect(error.status).toBe(status);
          expect(error).toBeInstanceOf(HttpException);

        }
      });

    });
  })

});
