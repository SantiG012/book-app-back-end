import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from '../book.service';
import { AbstracBookService } from '../abstract-book.service';
import { AbstractPrismaService } from '../../prisma/abstract-prisma.service';
import { PrismaService } from '../../prisma/prisma.service';

jest.mock('../../prisma/abstract-prisma.service');
jest.mock('../../prisma/prisma.service');


describe('BookService', () => {
  let service: AbstracBookService;

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
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
