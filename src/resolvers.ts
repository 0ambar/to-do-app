import { PrismaClient } from "@prisma/client";
import * as jwt from "jsonwebtoken"

// PrismaClient instance
export interface ApolloContext {
    prisma: PrismaClient;
}

// Resolvers
export const resolvers = {
    // Query resolvers
    Query: {
        users: async (parent: any, args: any, context: ApolloContext) => {
            return await context.prisma.user.findMany({
                include: { tasks: true }
            });
        }, 

        user: async (parent: any, args: { id: string }, context: ApolloContext) => {
            return await context.prisma.user.findUnique({
                where: { id: parseInt(args.id) },
                include: { tasks: true }
            });
        },

        tasks: async (parent: any, args: any, context: ApolloContext) => {
            return await context.prisma.task.findMany({
                include: { user: true }
            });
        },

        task: async (parent: any, args: { id: string }, context: ApolloContext) => {
            return await context.prisma.task.findUnique({
                where: { id: parseInt(args.id) }
            });
        },

        userTasks: async (parent: any, args: { userId: string }, context: ApolloContext) => {
            return await context.prisma.task.findMany({
                where: { userId: parseInt(args.userId) }
            });
        }
    },

    // Mutation resolvers
    Mutation: {
        createUser: async (parent: any, args: { input: { userName: string } }, context: ApolloContext ) => {
            return await context.prisma.user.create({
                data: args.input
            });
        },

        createTask: async (parent: any, args: { input: { title: string, description?: string, category?: string, userId: string } }, context: ApolloContext ) => {
            return await context.prisma.task.create({
                data: {
                    title: args.input.title,
                    description: args.input.description,
                    category: args.input.category || "To-do",
                    user: {
                        connect: { id: parseInt(args.input.userId )}, // Connect the task to the user
                    }
                }
            });
        },

        updateTask: async (parent: any, args: { id: string, input: { title?: string, description?: string, category?: string} }, context: ApolloContext) => {
            return await context.prisma.task.update({
                where: { id: parseInt(args.id) },
                data: args.input
            })
        }, 

        deleteTask: async (parent: any, args: { id: string }, context: ApolloContext) => {
            return await context.prisma.task.delete({
                where: { id: parseInt(args.id) }
            });
        }, 

        login: async (parent: any, args: { userName: string }, context: ApolloContext) => {
            const user = await context.prisma.user.findUnique({
                where: { userName: args.userName },
            });

            
            if(!user) {
                throw new Error("Invalid user")
            }
            
            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '3h'});
            
            return {
                user,
                token
            }
        },

        logout: (parent: any, args: any, context: ApolloContext) => {
            return { message: "Logout exitoso" }
        }
    },

    Task: { 
        user: async (parent: any, args: any, context: ApolloContext) => {
            return await context.prisma.user.findUnique({
                where: { id: parent.userId }
            });
        }
    },
}