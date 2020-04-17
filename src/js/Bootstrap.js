import React from 'react';
import { Router } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import customHistory from './logic/history';

import App from './App';

const Bootstrap = () => {
  return (
    <Router history={customHistory}>
      <App />
    </Router>
  );
};

export default hot(Bootstrap);
