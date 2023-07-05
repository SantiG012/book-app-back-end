import { Test, TestingModule } from '@nestjs/testing';
import { CreateAuthorDto } from '../author-dtos';
import { ValidationError, validate } from 'class-validator';
import { plainToClass, plainToInstance } from 'class-transformer';


describe('CreateAuthorDto',()=>{
    beforeEach(async()=>{
        const module: TestingModule = await Test.createTestingModule({
            controllers: [],
            providers: []
        }).compile();
    });

    it('should pass with valid data',async ()=>{

        const createAuthorDto:CreateAuthorDto = {
            authorName: 'John',
            authorLastName: 'Doe'
        };

        const errors = await validate(createAuthorDto);

        expect(errors).toStrictEqual([]);
    })

    describe('invalid data', ()=>{
        it('should fail if authorName is empty',async ()=>{
            const authorData ={
                authorName: "",
                authorLastName: "Doe"
            };

            const createAuthorDto = plainToInstance(CreateAuthorDto,authorData);
    
            const errors = await validate(createAuthorDto,{ validationError: { target: true, value:true } });


            expect(errors).toStrictEqual([plainToClass(ValidationError,{
                target: createAuthorDto,
                value: '',
                property: 'authorName',
                constraints: {
                    isNotEmpty: 'authorName should not be empty'
                },
                children: [],
            })]);
        })

        it('should fail if authorLastName is not a string',async ()=>{
            const authorData ={
                authorName: "John",
                authorLastName: 123
            };

            const createAuthorDto = plainToInstance(CreateAuthorDto,authorData);
    
            const errors = await validate(createAuthorDto,{ validationError: { target: true, value:true } });

            expect(errors).toStrictEqual([plainToClass(ValidationError,{
                target: createAuthorDto,
                value: 123,
                property: 'authorLastName',
                constraints: {
                    IsStringWithoutNumbers: "authorLastName's value must not contain numbers",
                    isString: 'authorLastName must be a string'
                },
                children: [],
            })]);
        });

        it('should fail if authorName is a string with digits',async ()=>{
            const authorData ={
                authorName: "John123",
                authorLastName: "Doe"
            };

            const createAuthorDto = plainToInstance(CreateAuthorDto,authorData);

            const errors = await validate(createAuthorDto,{ validationError: { target: true, value:true } });

            expect(errors).toStrictEqual([plainToClass(ValidationError,{
                target: createAuthorDto,
                value: 'John123',
                property: 'authorName',
                constraints: {
                    IsStringWithoutNumbers: "authorName's value must not contain numbers"
                },
                children: [],
            })]);
        });

    })
})