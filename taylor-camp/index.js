const { ApolloServer, gql } = require("apollo-server");
const musicians = require("./musician-data.json");

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

const resolvers = {
  Query: {
    allMusicians: () => musicians,
    musicianById: (parent, { id }) =>
      musicians.find((musician) => musician.id === id),
    totalMusicians: () => musicians.length
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen(4002).then(({ url }) => {
  console.log(`Taylor Camp Service running at ${url}`);
});
