import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { createUploadLink } from 'apollo-upload-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

import getTokenData from './logic/getTokenData';

let API = '/graphql';
if (process.env.NODE_ENV === 'development') {
  API = `http://localhost:${process.env.PORT || 8081}/graphql`;
}

const authentificationLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('token');
  const decoded = getTokenData(token);
  if (token && decoded && decoded.exp > Math.floor(Date.now() / 1000)) {
    operation.setContext({
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  } else {
    localStorage.removeItem('token');
  }
  return forward(operation);
});

const httpLink = createUploadLink({ uri: API });
const link = authentificationLink.concat(httpLink);

const cache = new InMemoryCache();

export const client = new ApolloClient({
  link,
  cache,
});

export default client;
