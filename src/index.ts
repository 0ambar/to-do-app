import { ApolloServer } from 'apollo-server';
import { PrismaClient } from '@prisma/client'; // Importa PrismaClient
import { typeDefs } from './schema';
import { resolvers, ApolloContext } from './resolvers'; // Importa el tipo de contexto

// Crea una instancia de PrismaClient
const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // Define el 'context' de Apollo Server.
  // Es una función que se ejecuta en cada petición y devuelve un objeto
  // que estará disponible para todos los resolvers.
  context: ({ req }): ApolloContext => {
    // Puedes añadir lógica de autenticación aquí, por ejemplo:
    // const token = req.headers.authorization || '';
    // const user = getUserFromToken(token); // Una función que verifica el token
    return {
      prisma, // Haz la instancia de Prisma disponible en el contexto
      // user, // Si tuvieras autenticación
    };
  },
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`Servidor Apollo listo en ${url}`);
  console.log(`Conectado a la base de datos a través de Prisma.`);
});