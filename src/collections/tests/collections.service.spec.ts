import { Test, TestingModule } from '@nestjs/testing';
import { CollectionsService } from '../collections.service';
import { AbstractPrismaService } from '../../prisma/abstract-prisma.service';
import { PrismaService } from '../../prisma/prisma.service';

jest.mock('../../prisma/prisma.service');

describe('CollectionsService', () => {
  let service: CollectionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CollectionsService,{
        provide: AbstractPrismaService,
        useClass: PrismaService
      }
    ],
    }).compile();

    service = module.get<CollectionsService>(CollectionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
