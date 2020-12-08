const { ApolloServer, gql } = require("apollo-server");
const {
  buildFederatedSchema
} = require("@apollo/federation");
const boats = require("./boat-data.json");

const typeDefs = gql`
  type Boat @key(fields: "id") {
    id: ID!
    name: String!
    topSpeed: Int!
    length: Int!
  }

  extend type Musician @key(fields: "id") {
    id: ID! @external
    boat: Boat!
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
  },
  Boat: {
    __resolveReference: ({ id }) =>
      boats.find((boat) => boat.id === id)
  },
  Musician: {
    boat: (musician) =>
      boats.find((boat) =>
        boat.passengers.includes(musician.id)
      )
  }
};

const server = new ApolloServer({
  schema: buildFederatedSchema([
    {
      typeDefs,
      resolvers
    }
  ])
});

server.listen(4001).then(({ url }) => {
  console.log(`Will Camp Service running at ${url}`);
});
