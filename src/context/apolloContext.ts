import { PrismaClient, User } from "@prisma/client";
import { getUserFromToken } from "../auth/authUtils";

export interface ApolloContext {
    prisma: PrismaClient;
    user?: User | null,
}

export const createContext = async (prisma: PrismaClient, req: any): Promise<ApolloContext> => {
    const user = await getUserFromToken(req.headers.authorization || '', prisma)

    return {
        prisma: prisma,
        user: user
    }
}