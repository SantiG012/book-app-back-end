import { HttpException } from "@nestjs/common";

export function badRequestException(resource:string):HttpException {
    return new HttpException(resource + ' already exists', 400);
}