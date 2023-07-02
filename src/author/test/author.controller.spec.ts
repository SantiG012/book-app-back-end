import { Test, TestingModule } from '@nestjs/testing';
import { AuthorController } from '../author.controller';
import { AbstractAuthorService } from '../abstract-author.service';
import { AuthorService } from '../author.service';

jest.mock('../author.service');

describe('AuthorController', () => {
  let controller: AuthorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthorController],
      providers: [{
        provide: AbstractAuthorService,
        useClass: AuthorService
      }]
    }).compile();

    controller = module.get<AuthorController>(AuthorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
