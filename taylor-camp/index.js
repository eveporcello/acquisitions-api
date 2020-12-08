const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Musician {
    id: ID!
    name: String!
    instrument: Instrument!
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
  typeDefs,
  mocks: true
});

server.listen(4002).then(({ url }) => {
  console.log(`Taylor Camp Service running at ${url}`);
});
