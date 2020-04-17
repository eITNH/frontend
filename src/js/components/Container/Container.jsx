import React from 'react';
import PropTypes from 'prop-types';

const Container = (props) => {
  return <div className="Container">{props.children}</div>;
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
