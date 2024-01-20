// server.js
import { ApolloServer } from '@apollo/server';
import MongoDBWrapper from './helpers/MongoDB.js';
import { startStandaloneServer } from '@apollo/server/standalone';
import typeDefs from './typedefs.js';
import resolvers from './resolvers/index.js';
import { config } from 'dotenv';

config();

console.log(process.env.DB_NAME + ' ' + process.env.DB_URI)


  const db = await new MongoDBWrapper(process.env.DB_URI, process.env.DB_NAME);
  await db.connect();
  console.log('Connected to MongoDB!');

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
