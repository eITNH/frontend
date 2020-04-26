import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import getTokenData from '../../logic/getTokenData';

const PrivateRoute = (props) => {
  const token = localStorage.getItem('token');
  const decoded = getTokenData(token);

  const { component: Component, ...filteredProps } = props;
  return (
    <Route
      {...filteredProps}
      render={(renderProps) => {
        if (token && decoded && decoded.exp > Math.floor(Date.now() / 1000)) {
          return <Component {...renderProps} />;
        }

        return <Redirect to="/login" />;
      }}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
};

export default PrivateRoute;
