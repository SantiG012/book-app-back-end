import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const repeatedResourceExceptionStub = () => {
    throw new PrismaClientKnownRequestError('Unique constraint',{
        code:'P2002',
        clientVersion:'2.19.0',
        meta:{
          target:['']
        }
    });
}