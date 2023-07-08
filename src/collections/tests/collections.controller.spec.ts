import { Test, TestingModule } from '@nestjs/testing';
import { CollectionsController } from '../collections.controller';
import { AbstractCollectionsService } from '../abstract-collections.service';
import { CollectionsService } from '../collections.service';
import { collectionIdStub, createCollectionStub } from './stubs';
import { CollectionIdDto } from '../dtos';

jest.mock('../collections.service')

describe('CollectionsController', () => {
  let controller: CollectionsController;
  let collectionService: AbstractCollectionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CollectionsController],
      providers: [{
        provide: AbstractCollectionsService,
        useClass: CollectionsService
      }]
    }).compile();

    controller = module.get<CollectionsController>(CollectionsController);
    collectionService = module.get<AbstractCollectionsService>(AbstractCollectionsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createCollection', () => {
    describe('when createCollection is called', () => {
      let collectionId:CollectionIdDto;

      beforeEach(async () => {
        collectionId = await controller.createCollection(createCollectionStub());
      });

      test('then it should call collectionService', () => {
        expect(collectionService.createCollection).toBeCalledWith(createCollectionStub());
      });

      test('then it should return a collectionId', () => {
        expect(collectionId).toEqual(collectionIdStub());
      });
    });
  });
});
