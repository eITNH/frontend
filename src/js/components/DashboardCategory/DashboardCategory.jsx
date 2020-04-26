import React from 'react';
import PropTypes from 'prop-types';

const DashboardCategory = (props) => {
  return (
    <div className="DashboardCategory">
      <div className="DashboardCategory-">
        <div className="DashboardCategory-Header">
          <div className="DashboardCategory-HeaderTitle">
            <span
              className="DashboardCategory-HeaderTitle-Emoji"
              role="img"
              aria-hidden="true"
            >
              {props.emoji}
            </span>
            {props.title}
          </div>
          <button className="DashboardCategory-HeaderButton" type="button">
            All {props.type}
          </button>
        </div>
        <div className="DashboardCategory--Content">{props.children}</div>
      </div>{' '}
    </div>
  );
};

DashboardCategory.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  emoji: PropTypes.string,
};

DashboardCategory.defaultProps = {
  children: <div>Nothing here...</div>,
  emoji: '',
};

export default DashboardCategory;
