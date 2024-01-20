const Validate = require('../helpers/Validate');
const ThrowError = require('../helpers/ThrowError');

const Event = {
  Query: {

  },
  Mutation: {
    createEntry: (_, { title, date, time, timeStop, Note, Category, }) => {
      if (!Validate.string(title)) {
        ThrowError('Invalid title: ' + title);
      }
      if (!Validate.string(Note)) {
        ThrowError('Invalid note: ' + Note)
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

      

    }
  }
};

export default Event;