import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from '../book.controller';
import { BookService } from '../book.service';
import { AbstracBookService } from '../abstract-book.service';
import { BookCreationDto } from '../book-dtos/bookCreationDto';

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
      let bookId:{bookId: string};

      const bookDto:BookCreationDto = {
        title: '1984',
        coverUrl: '',
      };

      beforeEach(async () => {
        await new Promise<void>((resolve)=>{
          bookController.createBook(bookDto).subscribe((emittedBookId:{bookId: string})=>{
            bookId = emittedBookId;
            resolve();
          })
        })
      });

      test('then it should call bookService', () => {
        expect(bookService.createBook).toBeCalledWith(bookDto);
      });


    });
  });

});
