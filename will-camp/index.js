const { ApolloServer, gql } = require("apollo-server");
const boats = require("./boat-data.json");

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

const resolvers = {
  Query: {
    allBoats: () => boats,
    findBoatByName: (parent, { name }) =>
      boats.find((boat) => boat.name === name),
    totalBoats: () => boats.length
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen(4001).then(({ url }) => {
  console.log(`Will Camp Service running at ${url}`);
});
