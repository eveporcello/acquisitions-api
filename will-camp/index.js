const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Boat {
    id: ID!
    name: String!
    topSpeed: Int!
    length: Int!
  }
  type Query {
    allBoats: [Boat!]!
    findBoatByName(name: String!): Boat!
    totalBoats: Int!
  }
`;

const server = new ApolloServer({
  typeDefs,
  mocks: true
});

server.listen(4001).then(({ url }) => {
  console.log(`Will Camp Service running at ${url}`);
});
