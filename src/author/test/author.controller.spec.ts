import { Test, TestingModule } from '@nestjs/testing';
import { AuthorController } from '../author.controller';
import { AbstractAuthorService } from '../abstract-author.service';
import { AuthorService } from '../author.service';
import { AuthorIdDto, CreateAuthorDto } from '../author-dtos';
import { createAuthorStub, sucessfulAuthorCreationStub } from './author.stubs';

jest.mock('../author.service');

describe('AuthorController', () => {
  let controller: AuthorController;
  let authorService: AbstractAuthorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthorController],
      providers: [{
        provide: AbstractAuthorService,
        useClass: AuthorService
      }]
    }).compile();

    controller = module.get<AuthorController>(AuthorController);
    authorService = module.get<AbstractAuthorService>(AbstractAuthorService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create author', () => {
    describe('when create author', () => {
      let authorId:AuthorIdDto;

      const createAuthorDto: CreateAuthorDto = createAuthorStub();

      beforeEach(async () => {
        authorId = await controller.createAuthor(createAuthorDto);
      });

      test('then it should call createAuthor', () => {
        expect(authorService.createAuthor).toHaveBeenCalledWith(createAuthorDto);
      });

      test('then it should return authorId', () => {
        expect(authorId).toEqual(sucessfulAuthorCreationStub());
      });

    });
  });
});
