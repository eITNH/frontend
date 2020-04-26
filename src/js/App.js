import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';

import LoggedInArea from './routes/LoggedInArea/index';
import Login from './routes/Login';
import SignUp from './routes/SignUp';

const App = () => {
  return (
    <main>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/sign-up" component={SignUp} />
        <PrivateRoute component={LoggedInArea} />
      </Switch>
    </main>
  );
};

export default App;
