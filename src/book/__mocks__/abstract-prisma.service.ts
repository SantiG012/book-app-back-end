import { PrismaClient } from '@prisma/client';

export abstract class AbstractPrismaService extends PrismaClient {
    //TODO: set the return type
  abstract cleanDb();
}