const {
  ApolloServer,
  gql
} = require("apollo-server");

const typeDefs = gql``;

const server = new ApolloServer({
  typeDefs,
  mocks: true
});

server.listen(4002).then(({ url }) => {
  console.log(
    `Taylor Camp Service running at ${url}`
  );
});
