const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

// Define the GraphQL schema
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// Define resolvers
const root = {
  hello: () => {
    console.log('Service Q received a GraphQL hello query');
    return 'Hello from Service Q!';
  }
};

// Expose GraphQL at /q instead of /graphql
app.use('/q', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: false // Disable GraphiQL UI (optional)
}));

app.listen(5007, () => {
  console.log('Service Q (GraphQL) running on port 5007, endpoint /q');
});

