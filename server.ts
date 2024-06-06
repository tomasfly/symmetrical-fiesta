import { graphql, buildSchema, print } from "graphql";
import { loadFilesSync } from "@graphql-tools/load-files";
import { join } from "path";

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The rootValue provides a resolver function for each API endpoint
const rootValue = {
  hello: () => {
    return "Hello world!";
  },
};

// Load the GraphQL query from the query.graphql file
const queries = loadFilesSync(join(__dirname, "query.graphql"));

// Run the GraphQL query '{ hello }' and print out the response
graphql({
  schema,
  source: print(queries[0]),
  rootValue,
}).then((response) => {
  console.log(response);
});