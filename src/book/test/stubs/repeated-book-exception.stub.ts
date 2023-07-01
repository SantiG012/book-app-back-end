import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

export const repeatedBookExceptionStub = () => {
    throw new PrismaClientKnownRequestError('Unique constraint',{
        code:'P2002',
        clientVersion:'2.19.0',
        meta:{
          target:['bookId']
        }
    });
}