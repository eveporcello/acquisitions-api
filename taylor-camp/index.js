const { ApolloServer, gql } = require("apollo-server");
const {
  buildFederatedSchema
} = require("@apollo/federation");

const typeDefs = gql`
  type Musician @key(fields: "id") {
    id: ID!
    name: String!
    instrument: Instrument!
  }

  extend type Boat @key(fields: "id") {
    id: ID! @external
    passengers: [Musician!]!
  }

  enum Instrument {
    GUITAR
    BASS
    PIANO
    DRUMS
    THERAMIN
  }
  type Query {
    allMusicians: [Musician!]!
    musicianById(id: ID!): Musician!
    totalMusicians: Int!
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

server.listen(4002).then(({ url }) => {
  console.log(`Taylor Camp Service running at ${url}`);
});
