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
import AI from './helpers/AI.js'
import HTML from './helpers/HTML.js'
import Mail from './helpers/Mail.js';

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
      title: 'Isaac you have ' + today.length + ' things to do today!',
      message: 'Start your application and see what you have to do today!',
      wait: true // Wait for User Action against Notification
    })
  }
  if (undone.length > 0) {
    notifier.notify({
      title: 'Isaac you have not completed ' + undone.length + ' things.',
      message: 'ISAACCCCCC! There are somethings you\'ve not done today! ',
      wait: true // Wait for User Action against Notification
    })
  }


  if (undone.length > 0 || today.length > 0) {
    const prompt = `
    Hey AI, let's level up your skills! I want you to become a top-notch UI/UX designer, mastering HTML and CSS. Get deep into modern design principles, think responsiveness, and keep accessibility in mind. Your goal is to craft interfaces that are not just good-looking but user-friendly for e-mails.
  
    Follow the following instructions to in detail.
  
    1. You would be given 2 array of events to be completed and other details. your job is to take the array and formulate a friendly mail reminding them of the details...  start by saying Good day Isaac.
    2. The first array contains things that should be done for that particular day thile the second one contains things that have not been done for a long time. make sure you have all the details on the mail so that the user is informed of everything and use color codes well besed on the events
    3. The values of the contents should be parsed and formatted accordingly. use lists when needed and emphasize on words when needed. use your genius in UIUX to achieve this goal.
    4. whatever font and color you should be professional.
  
  
    An example is below 
  
    
  
    RESPOND ONLY WITH THE MODIFIED HTML CODE.
  
  
    The arrays are below code is below.
  
  
    Things to be done for the day
    ${JSON.stringify(today, null, 2)}
  
    Things not done for a long time
    ${JSON.stringify(undone, null, 2)}
    `

    const value = HTML(await AI(prompt));

    await Mail(value)
  }

  console.log('done!');
};

// Assuming Process function is part of a larger context with DateTime and db defined


// Define the cron job to run every 12 hours
cron.schedule('0 */12 * * *', () => {
  Process();
});


Process();

export default db
