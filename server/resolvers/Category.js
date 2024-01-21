import db from '../index.js';
import Validate from '../helpers/Validate.js';
import ThrowError from '../helpers/ThrowError.js';

const Category = {
  Mutation: {
    createCategory: async (_, { name }) => {
      if (!Validate.string(name)) {
        ThrowError('Invalid category name: ' + name);
      }

      try {
        await db.insertOne('category', { name });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    updateCategory: async (_, { id, name }) => {
      if (!Validate.string(name) || !Validate.string(id)) {
        ThrowError('Invalid category data');
      }

      try {
        await db.updateOne('category', { name }, { _id: id });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    deleteCategory: async (_, { id }) => {
      if (!Validate.string(id)) {
        ThrowError('Invalid category ID');
      }

      try {
        await db.deleteOne('category', { _id: id });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
  Query: {
    getAllCategory: async () => {
      try {
        const allCategories = await db.findAll('category');
        if (Validate.array(allCategories)) {
          return allCategories;
        } else {
          ThrowError('error');
        }
      } catch (error) {
        console.log(error);
        return [];
      }
    },
  },
};

export default Category;
