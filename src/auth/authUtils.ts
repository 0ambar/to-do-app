import { PrismaClient, User } from "@prisma/client";
import * as jwt from 'jsonwebtoken';

export const getUserFromToken = async (token: string, prisma: PrismaClient): Promise<User | null> => {
    if(!token)
        return null

    const cleanToken = token.replace('Bearer ', '');
    
    const decoded = jwt.verify(cleanToken, process.env.JWT_SECRET!) as { userId: number }

    const user = await prisma.user.findUnique({ 
        where: { id: decoded.userId },
        include: { tasks: true }
    })

    return user
}
