import { ApolloServer } from 'apollo-server';
import { PrismaClient } from '@prisma/client'; // Importa PrismaClient
import { typeDefs } from './schema';
import { resolvers } from './resolvers'; // Importa el tipo de contexto
import { ApolloContext, createContext } from './context/apolloContext';

// Crea una instancia de PrismaClient
const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }): Promise<ApolloContext> => {
    return await createContext(prisma, req);
  },
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`Servidor Apollo listo en ${url}`);
});