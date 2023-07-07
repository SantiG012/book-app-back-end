import { Test, TestingModule } from '@nestjs/testing';
import { addAuthorsDtoStub } from './stubs';
import { ValidationError, validate } from 'class-validator';
import { plainToClass, plainToInstance } from 'class-transformer';
import { AddAuthorsDto } from '../book-dtos';

describe('AddAuthorDto',()=>{
    beforeEach(async()=>{
        const module: TestingModule = await Test.createTestingModule({
            controllers: [],
            providers: []
        }).compile();
    });

    it('should pass with valid data',async ()=>{
        const addAuthorsDto = addAuthorsDtoStub();

        const errors = await validate(addAuthorsDto);

        expect(errors).toStrictEqual([]);
    });

    describe('invalid data', ()=>{
        it('should fail if bookId is empty',async ()=>{
            let addAuthorsDto = addAuthorsDtoStub();

            addAuthorsDto.bookId = '';

            addAuthorsDto = plainToInstance(AddAuthorsDto,addAuthorsDto);

            const errors = await validate(addAuthorsDto);

            expect(errors).toStrictEqual([plainToClass(ValidationError,{
                target: addAuthorsDto,
                value: '',
                property: 'bookId',
                constraints: {
                    isNotEmpty: 'bookId should not be empty'
                },
                children: [],
            })]);
        });

        it("should fail if author's array is empty",async ()=>{
            let addAuthorsDto = addAuthorsDtoStub();

            addAuthorsDto.authors = [];

            addAuthorsDto = plainToInstance(AddAuthorsDto,addAuthorsDto);

            const errors = await validate(addAuthorsDto);

            expect(errors).toStrictEqual([plainToClass(ValidationError,{
                target: addAuthorsDto,
                value: [],
                property: 'authors',
                constraints: {
                    arrayNotEmpty: "author's array should not be empty",
                },
                children: [],
            })]);
        });

        it("should fail if author's array contains empty string",async ()=>{
            let addAuthorsDto = addAuthorsDtoStub();

            addAuthorsDto.authors = ['','author'];

            addAuthorsDto = plainToInstance(AddAuthorsDto,addAuthorsDto);

            const errors = await validate(addAuthorsDto);

            expect(errors).toStrictEqual([plainToClass(ValidationError,{
                target: addAuthorsDto,
                value: ['','author'],
                property: 'authors',
                constraints: {
                    isNotEmpty: 'each value in authors should not be empty'
                },
                children: [],
            })]);
        });
    });
});