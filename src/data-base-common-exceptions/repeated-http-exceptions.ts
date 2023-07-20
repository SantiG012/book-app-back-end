import { HttpException } from "@nestjs/common";

export function badRequestException(resource:string):HttpException {
    return new HttpException(resource + ' already exists', 400);
}

export function conflictException(resource:string):HttpException {
    return new HttpException(resource + ' already exists', 409);
}