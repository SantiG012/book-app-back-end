import { Test, TestingModule } from '@nestjs/testing';
import { addAuthorDtoStub } from './stubs';
import { ValidationError, validate } from 'class-validator';
import { plainToClass, plainToInstance } from 'class-transformer';
import { AddAuthorDto } from '../book-dtos';

describe('AddAuthorDto',()=>{
    beforeEach(async()=>{
        const module: TestingModule = await Test.createTestingModule({
            controllers: [],
            providers: []
        }).compile();
    });

    it('should pass with valid data',async ()=>{
        const addAuthorDto = addAuthorDtoStub();

        const errors = await validate(addAuthorDto);

        expect(errors).toStrictEqual([]);
    });

    describe('invalid data', ()=>{
        it('should fail if bookId is empty',async ()=>{
            let addAuthorDto = addAuthorDtoStub();

            addAuthorDto.bookId = '';

            addAuthorDto = plainToInstance(AddAuthorDto,addAuthorDto);

            const errors = await validate(addAuthorDto);

            expect(errors).toStrictEqual([plainToClass(ValidationError,{
                target: addAuthorDto,
                value: '',
                property: 'bookId',
                constraints: {
                    isNotEmpty: 'bookId should not be empty'
                },
                children: [],
            })]);
        });

        it("should fail if author's id is empty",async ()=>{
            let addAuthorDto = addAuthorDtoStub();

            addAuthorDto.authorId = '';

            addAuthorDto = plainToInstance(AddAuthorDto,addAuthorDto);

            const errors = await validate(addAuthorDto);

            expect(errors).toStrictEqual([plainToClass(ValidationError,{
                target: addAuthorDto,
                value: '',
                property: 'authorId',
                constraints: {
                    isNotEmpty: 'authorId should not be empty',
                },
                children: [],
            })]);
        });
    });
});