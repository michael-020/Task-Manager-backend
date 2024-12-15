import { PrismaClient, Prisma }  from "@prisma/client"

type User = PrismaClient["user"];

interface IUser{
    id: number;
    username: string;
    email: string;
    createdAt: Date; 
    Projects?: [];
}

declare global {
    namespace Express {
        interface Request {
            userId?: number,
            user: IUser
        }
    }
}