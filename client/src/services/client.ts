import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "apollo-link-context";
import { createHttpLink } from "apollo-link-http";
import { ApolloLink } from "apollo-link";

const cache = new InMemoryCache();

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql"
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? token : ""
    }
  };
});

const uploadLink = createUploadLink({ uri: "http://localhost:4000/graphql" });

const link = ApolloLink.from([httpLink, authLink, uploadLink]);

export const client = new ApolloClient({ link, cache });
