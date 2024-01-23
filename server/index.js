// server.js
import { DateTime } from 'luxon';
import cron from 'node-cron';
import { ApolloServer } from '@apollo/server';
import MongoDBWrapper from './helpers/MongoDB.js';
import { startStandaloneServer } from '@apollo/server/standalone';
import typeDefs from './typedefs.js';
import resolvers from './resolvers/index.js';
import { config } from 'dotenv';
import notifier from 'node-notifier';

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


const Process = async () => {
  const All = await db.findAll('Events');
  let today = [];
  let undone = [];

  All.forEach((data, index) => {
    const targetDate = DateTime.fromISO(data.date);
    const currentDate = DateTime.local();

    if (targetDate.hasSame(currentDate, 'day')) {
      today.push(data);
    } else if (data.done === 'false') {
      undone.push(data);
    }
  });


  if (today.length > 0) {
    notifier.notify({
      title: 'Isaac you have' + today.length + ' somethings to do today!',
      message: 'Start your application and see what you have to do today!',
      wait: true // Wait for User Action against Notification
    })
  }
  if (undone.length > 0){
    notifier.notify({
      title: 'Isaac you have not completed' + undone.length + ' things.',
      message: 'ISAACCCCCC! There are somethings you\'ve not done today! ',
      wait: true // Wait for User Action against Notification
    })
  }
};

// Assuming Process function is part of a larger context with DateTime and db defined


// Define the cron job to run every 12 hours
cron.schedule('* * * * *', () => {
  // check if the date is today.
  // If the day is today, it's to add the id of the event to the notifications table and the title of the event after deleteing the perious event.
  // It's also to mail the event to the users email

  Process();

});



export default db
