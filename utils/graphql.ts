import { GraphQLClient } from "graphql-request";

export const graphqlClient = () => {
  return new GraphQLClient(process.env.HEADLESS_WORDPRESS_SERVER as string);
};
