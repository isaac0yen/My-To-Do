const typeDefs = `#graphql
  scalar JSON

  input Entry { title:String, date:String, time:String, timeStop:String, note:String, Category:String, }
  
  type Query {
    getAllEntries:JSON
    getAllCategory:JSON
  }

  type Mutation{
    createEntry(input:Entry):Boolean
    updateEntry(id:String,input:Entry):Boolean
    deleteEntry(id:String):Boolean

    createCategory(name:String):Boolean
    updateCategory(name:String,id:String):Boolean
    deleteCategory(id:String):Boolean

  }
`;
export default typeDefs