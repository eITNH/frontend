import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = (props) => {
  // TODO: Get Token?
  const token = 'token';

  const { component: Component, ...filteredProps } = props;
  return (
    <Route
      {...filteredProps}
      render={(renderProps) => {
        // TODO: Login Check / Check if Token is valid :)
        if (!token) {
          return <Redirect to="/login" />;
        }

        return <Component {...renderProps} />;
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
