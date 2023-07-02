import { HttpException } from "@nestjs/common";

export function createError(erroCode:string, resource:string):HttpException {
    if (erroCode === 'P2002') {
        return new HttpException(`${resource} already exists`, 409);
    }
    return new HttpException('Internal server error', 500);
} 