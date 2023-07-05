import { Test, TestingModule } from '@nestjs/testing';
import { AuthorController } from '../author.controller';
import { AbstractAuthorService } from '../abstract-author.service';
import { AuthorService } from '../author.service';
import { AuthorIdDto, CreateAuthorDto } from '../author-dtos';
import { createAuthorStub, sucessfulAuthorCreationStub } from './author.stubs';
import { HttpException } from '@nestjs/common';
import { badRequestException } from '../../data-base-common-exceptions/repeated-http-exceptions';

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

  describe('create an existing author',()=>{
    describe('when create an existing author',()=>{
      beforeEach(async ()=>{
          authorService.createAuthor = jest.fn().mockRejectedValue(()=>{
          throw badRequestException('Author');
        })
      });

      test('then it should throw an HttpException', async () => {
        await expect(controller.createAuthor(createAuthorStub())).rejects.toThrow(HttpException);
      });
    });
  })
});
