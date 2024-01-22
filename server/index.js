import cron from 'node-cron';
// server.js
import { ApolloServer } from '@apollo/server';
import MongoDBWrapper from './helpers/MongoDB.js';
import { startStandaloneServer } from '@apollo/server/standalone';
import typeDefs from './typedefs.js';
import resolvers from './resolvers/index.js';
import { config } from 'dotenv';

config();

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




// Define the cron job to run every 12 hours
cron.schedule('0 */12 * * *', () => {
  // check if the date is today.
  // If the day is today, it's to add the id of the event to the notifications table and the title of the event after deleteing the perious event.
  // It's also to mail the event to the users email
  console.log('Hello World!');
});



export default db
