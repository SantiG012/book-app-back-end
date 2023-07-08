import { Test, TestingModule } from '@nestjs/testing';
import { CollectionsController } from '../collections.controller';
import { AbstractCollectionsService } from '../abstract-collections.service';
import { CollectionsService } from '../collections.service';

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
});
