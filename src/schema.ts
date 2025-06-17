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
        tasks: [Tasks!]!
    }

    input CreateUserInput {
        userName: String!
    }

    input CreateTaskInput {
        title: String!
        description: String
        category: String = "To do"
        userId = ID!
    }

    type Query {
        users: [User!]!
        user(id: ID!): User

        tasks: [Task!]!
        task(id: ID!): Task

        userTasks(userId: ID!): [Task!]!
    }

    type Mutation {
        createUser(input: CreateUserInput!): User!
        createTask(input: CreateTaskInput!): Task!
    }
`;

