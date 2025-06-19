import { gql } from "apollo-server";

export const typeDefs = gql `
    type Task {
        title: String!
        description: String
        category: String
        user: User!
    }

    type User {
        id: ID!
        userName: String!
        tasks: [Task!]!
    }

    
    type Query {
        users: [User!]!
        user(id: ID!): User
        
        tasks: [Task!]!
        task(id: ID!): Task
        
        userTasks(userId: ID!): [Task!]!
    }
        
    input CreateUserInput {
        userName: String!
    }

    input CreateTaskInput {
        title: String!
        description: String
        category: String
        userId: ID!
    }
        
    input UpdateTaskInput {
        title: String
        description: String
        category: String
    }

    type Mutation {
        createUser(input: CreateUserInput!): User!
        createTask(input: CreateTaskInput!): Task!
        updateTask(id: ID!, input: UpdateTaskInput!): Task
        deleteTask(id: ID!): Task
    }
`;

