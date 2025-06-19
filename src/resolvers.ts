import { PrismaClient } from "@prisma/client";

// PrismaClient instance
export interface ApolloContext {
    prisma: PrismaClient;
}

// interface User {
//     id: number;
//     userName: string;
// }

// interface Taks {
//     id: number;
//     title: string;
//     description: string;
//     category: string;
//     userId: number;
// }

// Resolvers
export const resolvers = {
    // Query resolvers
    Query: {
        users: (parent: any, args: any, context: ApolloContext) => {
            return context.prisma.user.findMany({
                include: { tasks: true }
            });
        }, 

        user: (parent: any, args: { id: string }, context: ApolloContext) => {
            return context.prisma.user.findUnique({
                where: { id: parseInt(args.id) },
                include: { tasks: true }
            });
        },

        tasks: (parent: any, args: any, context: ApolloContext) => {
            return context.prisma.task.findMany({
                include: { user: true }
            });
        },

        task: (parent: any, args: { id: string }, context: ApolloContext) => {
            return context.prisma.task.findUnique({
                where: { id: parseInt(args.id) }
            });
        },

        userTasks: (parent: any, args: { userId: string }, context: ApolloContext) => {
            return context.prisma.task.findMany({
                where: { userId: parseInt(args.userId) }
            });
        }
    },

    // Mutation resolvers
    Mutation: {
        createUser: (parent: any, args: { input: { userName: string } }, context: ApolloContext ) => {
            return context.prisma.user.create({
                data: args.input
            });
        },

        createTask: (parent: any, args: { input: { title: string, description?: string, category?: string, userId: string } }, context: ApolloContext ) => {
            return context.prisma.task.create({
                data: {
                    title: args.input.title,
                    description: args.input.description,
                    category: args.input.category || "ToDo",
                    user: {
                        connect: { id: parseInt(args.input.userId )}, // Connect the task to the user
                    }
                }
            });
        },

        updateTask: (parent: any, args: any, context: ApolloContext) => {

        }, 

        deleteTask: (parent: any, args: any, context: ApolloContext) => {

        }, 

    },

    Task: { 
        user: (parent: any, args: any, context: ApolloContext) => {
            return context.prisma.user.findUnique({
                where: { id: parent.userId }
            });
        }
    }
}