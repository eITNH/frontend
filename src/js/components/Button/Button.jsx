import PropTypes from 'prop-types';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Modal from '../Modal';

const Button = (props) => {
  const [modalOpen, setModalOpen] = React.useState(() => {
    return false;
  });

  const handleClick = () => {
    if (typeof props.onClick === 'function' && !props.disabled) {
      props.onClick();
    }
  };

  const classNames = props.className
    ? props.className
    : `
        Button
        Button--${props.disabled ? 'disabled' : props.type}
        ${props.small ? 'Button--small' : ''}
        ${props.align ? `Button--${props.align}` : ''}
      `;

  // Render internal Link
  if (props.link) {
    return (
      <RouterLink
        style={props.style}
        className={classNames}
        to={props.link}
        onClick={handleClick}
      >
        {props.icon && (
          <i
            className={`fas fa-${props.icon} Button-icon`}
            aria-hidden="true"
          />
        )}
        {props.children && (
          <span className="Button-text">{props.children}</span>
        )}
      </RouterLink>
    );
  }

  // Render external Link
  if (props.url) {
    return (
      <a
        style={props.style}
        className={classNames}
        href={props.url}
        onClick={handleClick}
        target="_blank"
        rel="noopener noreferrer"
      >
        {props.icon && (
          <i
            className={`fas fa-${props.icon} Button-icon`}
            aria-hidden="true"
          />
        )}
        {props.children && (
          <span className="Button-text">{props.children}</span>
        )}
      </a>
    );
  }

  // Render Modal on Click
  if (props.render) {
    return (
      <>
        <button
          style={props.style}
          className={classNames}
          type="button"
          onClick={() => {
            handleClick();
            setModalOpen(() => {
              return true;
            });
          }}
        >
          {props.icon && (
            <i
              className={`fas fa-${props.icon} Button-icon`}
              aria-hidden="true"
            />
          )}
          {props.children && (
            <span className="Button-text">{props.children}</span>
          )}
        </button>
        <Modal
          open={modalOpen}
          onClose={() => {
            return setModalOpen(() => {
              return false;
            });
          }}
        >
          {props.render}
        </Modal>
      </>
    );
  }

  // Render functional Button (default)
  return (
    <button
      style={props.style}
      type="button"
      className={classNames}
      onClick={handleClick}
    >
      {props.icon && (
        <i className={`fas fa-${props.icon} Button-icon`} aria-hidden="true" />
      )}
      {props.children && <span className="Button-text">{props.children}</span>}
    </button>
  );
};

Button.propTypes = {
  render: PropTypes.node,
  children: PropTypes.string,
  icon: PropTypes.string,
  className: PropTypes.string,
  link: PropTypes.string,
  url: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  small: PropTypes.bool,
  type: PropTypes.oneOf([
    'default',
    'secondary',
    'danger',
    'warning',
    'opaque',
  ]),
  align: PropTypes.oneOf(['center', 'left', 'right', '']),
  style: PropTypes.objectOf(PropTypes.string),
};

Button.defaultProps = {
  children: '',
  className: '',
  type: 'default',
  small: false,
  disabled: false,
  link: '',
  url: '',
  onClick: () => {
    return null;
  },
  icon: '',
  render: null,
  style: {},
  align: '',
};

export default Button;
