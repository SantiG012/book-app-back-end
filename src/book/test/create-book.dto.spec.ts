import { Test, TestingModule } from '@nestjs/testing';
import { bookCreationDtoStub } from './stubs';
import { ValidationError, validate } from 'class-validator';
import { describe } from 'node:test';
import { plainToClass, plainToInstance } from 'class-transformer';
import { CreateBookDto } from '../book-dtos';

describe('CreateBookDto',()=>{
    beforeEach(async()=>{
        const module: TestingModule = await Test.createTestingModule({
            controllers: [],
            providers: []
        }).compile();
    });

    it('should pass with valid data',async ()=>{
        const createBookDto = bookCreationDtoStub();

        const errors = await validate(createBookDto);

        expect(errors).toStrictEqual([]);
    });

    describe('invalid data', ()=>{
        it('should fail if title is empty',async ()=>{

            const bookData = {
                title: '',
                coverUrl: 'link'
            }

            const createBookDto = plainToInstance(CreateBookDto,bookData);

            

            const errors = await validate(createBookDto,{ validationError: { target: true, value:true } });

            expect(errors).toStrictEqual([plainToClass(ValidationError,{
                target: createBookDto,
                value: '',
                property: 'title',
                constraints: {
                    isNotEmpty: 'title should not be empty'
                },
                children: [],
            })]);
        });

        it('should fail if coverUrl is not a string',async ()=>{
            const bookData = {
                title: 'title',
                coverUrl: 123
            }

            const createBookDto = plainToInstance(CreateBookDto,bookData);

            const errors = await validate(createBookDto);

            expect(errors).toStrictEqual([plainToClass(ValidationError,{
                target: createBookDto,
                value: 123,
                property: 'coverUrl',
                constraints: {
                    isString: 'coverUrl must be a string'
                },
                children: [],
            })]);
        });
    });
})