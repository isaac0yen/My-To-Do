const typeDefs = `#graphql
  scalar JSON
  
  type Query {
    hello:String
  }

  type Mutation{
    hello:String
  }
`;
export default typeDefs