import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';
import { AbstractPrismaService } from '../abstract-prisma.service';
import { ConfigModule } from '@nestjs/config';

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
});
