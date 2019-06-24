import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';

const cache = new InMemoryCache();
export const client = new ApolloClient({
  link: createUploadLink({ uri: "http://localhost:4000/graphql" }),
  cache,
});