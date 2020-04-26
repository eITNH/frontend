import React from 'react';
import { Router } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { hot } from 'react-hot-loader/root';

import customHistory from './logic/history';
import { client } from './apolloInstance';

import App from './App';

const Bootstrap = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={customHistory}>
        <App />
      </Router>
    </ApolloProvider>
  );
};

export default hot(Bootstrap);
