import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
  } from 'class-validator';

  
  @ValidatorConstraint({ async: false, name: 'IsStringWithoutNumbers' })
  export class StringWithoutNumbers implements ValidatorConstraintInterface {
    constructor() {}
  
    validate(value: string, args:ValidationArguments) {
        return !(/\d/.test(value));
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        const property = validationArguments.property;
        return `${property}'s value must not contain numbers`;
    }
  }
  
  export function IsStringWithoutNumbers(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: StringWithoutNumbers,
      });
    };
  }