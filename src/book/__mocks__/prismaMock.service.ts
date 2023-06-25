import { AbstractPrismaService } from "./abstract-prisma.service";

export class PrismaService extends AbstractPrismaService {

    async cleanDb() {
        return null;
    }
}