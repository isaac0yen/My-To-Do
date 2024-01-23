import Validate from '../helpers/Validate.js';
import ThrowError from '../helpers/ThrowError.js'
import db from '../index.js';

const Event = {
  Query: {
    getAllEntries: () => {
      const All = db.findAll('Events')

      if (Validate.array) {
        return All
      } else {
        ThrowError('Error getting all data for events')
      }

    }
  },
  Mutation: {
    createEntry: async (_, { input }) => {
      const { title, date, time, timeStop, note, Category } = input;
      if (!Validate.string(title)) {
        ThrowError('Invalid title: ' + title);
      }
      if (!Validate.string(note)) {
        ThrowError('Invalid note: ' + note)
      }
      if (!Validate.string(Category)) {
        ThrowError('Invalid category: ' + Category)
      }
      if (!Validate.isValidDate(date)) {
        ThrowError('Invalid date: ' + date);
      }
      if (!Validate.isValidTime(time) || !Validate.isValidTime(timeStop)) {
        ThrowError('Invalid time: ' + time + ' ' + timeStop);
      }

      let isFinished

      try {
        isFinished = await db.insertOne('Events', { title, date, time, timeStop, note, Category, done: 'false' })
      } catch (error) {
        console.log(error);
      }

      if (isFinished) {
        return true;
      }
    },
    updateEntry: async (_, { id, input }) => {
      const { title, date, time, timeStop, note, Category } = input;
      if (!Validate.string(title)) {
        ThrowError('Invalid title: ' + title);
      }
      if (!Validate.string(note)) {
        ThrowError('Invalid note: ' + note)
      }
      if (!Validate.string(Category)) {
        ThrowError('Invalid category: ' + Category)
      }
      if (!Validate.isValidDate(date)) {
        ThrowError('Invalid date: ' + date);
      }
      if (!Validate.isValidTime(time) || !Validate.isValidTime(timeStop)) {
        ThrowError('Invalid time: ' + time + ' ' + timeStop);
      }

      let isFinished

      try {
        isFinished = await db.updateOne('Events', { title, date, time, timeStop, note, Category }, { _id: id })
      } catch (error) {
        console.log(error);
      }

      if (isFinished) {
        return true;
      }
    },
    deleteEntry: async (_, { id }) => {
      if (!Validate.string(id)) {
        ThrowError('Invalid entry')
      }

      let isFinished

      try {
        isFinished = await db.deleteOne('Events', { _id: id })
      } catch (error) {
        console.log(error);
      }

      if (isFinished) {
        return true;
      }

    }
  }
};

export default Event;