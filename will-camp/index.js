const { ApolloServer, gql } = require("apollo-server");
const {
  buildFederatedSchema
} = require("@apollo/federation");

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

const server = new ApolloServer({
  schema: buildFederatedSchema([
    {
      typeDefs,
      mocks: true
    }
  ])
});

server.listen(4001).then(({ url }) => {
  console.log(`Will Camp Service running at ${url}`);
});
