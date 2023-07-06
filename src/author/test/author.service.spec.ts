import { Test, TestingModule } from '@nestjs/testing';
import { AuthorService } from '../author.service';
import { AbstractPrismaService } from '../../prisma/abstract-prisma.service';
import { PrismaService } from '../../prisma/prisma.service';

jest.mock('../../prisma/prisma.service');

describe('AuthorService', () => {
  let service: AuthorService;
  let prismaService: AbstractPrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthorService,
        {
          provide: AbstractPrismaService,
          useClass: PrismaService
        }
      ],
    }).compile();

    service = module.get<AuthorService>(AuthorService);
    prismaService = module.get<AbstractPrismaService>(AbstractPrismaService);
    
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
