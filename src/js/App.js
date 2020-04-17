import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';

import Dashboard from './routes/Dashboard';
import Login from './routes/Login';

const App = () => {
  return (
    <>
      <main>
        <Switch>
          <Route path="/Login" component={Login} />
          <PrivateRoute component={Dashboard} />
        </Switch>
      </main>
    </>
  );
};

export default App;
