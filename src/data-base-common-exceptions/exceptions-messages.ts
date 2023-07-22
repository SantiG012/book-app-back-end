import { HttpException } from "@nestjs/common";

export function createError(erroCode:string, resource:string):HttpException {
    if (erroCode === 'P2002') {
        return new HttpException(`${resource} already exists`, 409);
    }
    if (erroCode === 'P2025') {
        return new HttpException(`${resource} not found`, 404);
    }
    if (erroCode === 'P2003') {
        return new HttpException(`${resource}'s foreign key not found`, 404);
    }
    return new HttpException('Internal server error', 500);
} 