import Event from "./Event.js";
import Category from "./Category.js";
const resolvers = {
  Query: {
    ...Event.Query,
    ...Category.Query
  },
  Mutation: {
    ...Event.Mutation,
    ...Category.Mutation
  }
};

export default resolvers;