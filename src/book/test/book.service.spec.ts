import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from '../book.service';
import { AbstracBookService } from '../abstract-book.service';

describe('BookService', () => {
  let service: AbstracBookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{
        provide: AbstracBookService,
        useClass: BookService
      }],
    }).compile();

    service = module.get<AbstracBookService>(AbstracBookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
