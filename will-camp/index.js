const {
  ApolloServer,
  gql
} = require("apollo-server");

const typeDefs = gql``;

const server = new ApolloServer({
  typeDefs,
  mocks: true
});

server.listen(4001).then(({ url }) => {
  console.log(
    `Will Camp Service running at ${url}`
  );
});
