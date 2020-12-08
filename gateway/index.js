const { ApolloServer } = require("apollo-server");
const { ApolloGateway } = require("@apollo/gateway");

const gateway = new ApolloGateway({
  serviceList: [
    {
      name: "will-camp",
      url: "http://localhost:4001"
    },
    {
      name: "taylor-camp",
      url: "http://localhost:4002"
    }
  ]
});

(async () => {
  const { schema, executor } = await gateway.load();

  const server = new ApolloServer({
    schema,
    executor
  });

  server.listen().then(({ url }) => {
    console.log(`🏕 Camp Gateway available at ${url}`);
  });
})();
