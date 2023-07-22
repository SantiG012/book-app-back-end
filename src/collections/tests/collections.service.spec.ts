import { Test, TestingModule } from '@nestjs/testing';
import { CollectionsService } from '../collections.service';
import { AbstractPrismaService } from '../../prisma/abstract-prisma.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CollectionIdDto, CreateCollectionDto } from '../dtos';
import { collectionIdStub, createCollectionStub } from './stubs';

jest.mock('../../prisma/prisma.service');

describe('CollectionsService', () => {
  let service: CollectionsService;
  let prismaService: AbstractPrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CollectionsService,{
        provide: AbstractPrismaService,
        useClass: PrismaService
      }
    ],
    }).compile();

    service = module.get<CollectionsService>(CollectionsService);
    prismaService = module.get<AbstractPrismaService>(AbstractPrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create a collection', () => {
    describe('when create a collection', () => {
      let collectionId:CollectionIdDto;
      const createCollectionDto:CreateCollectionDto = createCollectionStub();

      beforeAll(async () => {
        collectionId = await service.createCollection(createCollectionDto);
      });

      it('should return a collection id',()=>{
        expect(collectionId).toEqual(collectionIdStub());
      })

      it('should call the prismaService',()=>{
        expect(prismaService.collections.create).toBeCalledWith({
          data: createCollectionDto,
          select: {
            collectionId: true
          }
        });
      });

      it('should call the prismaService only once',()=>{
        expect(prismaService.collections.create).toBeCalledTimes(1);
      });

      it('should return a CollectionIdDto',()=>{
        expect(collectionId).toStrictEqual(collectionIdStub());
      });

    });
  });
});
