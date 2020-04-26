import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import useClickAway from '../../hooks/useClickAway';

const Navigation = (props) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const menuRef = useRef();
  useClickAway(menuRef, () => {
    setUserMenuOpen(false);
  });

  return (
    <div className="Navigation" ref={menuRef}>
      <div className="Navigation-TopNavigation">
        <NavLink to="/" className="Navigation-TopNavigationLogo">
          <div className="Navigation-TopNavigationLogo-Name">eITNH</div>
          <div className="Navigation-TopNavigationLogo-Description">
            The new E-Learning Platform
          </div>
        </NavLink>
        <button
          type="button"
          onClick={() => {
            setUserMenuOpen((prevState) => {
              return !prevState;
            });
          }}
          className="Navigation-TopNavigationUser"
        >
          <FontAwesomeIcon
            className={`Navigation-TopNavigationUser-Icon ${
              userMenuOpen ? 'is-Turned' : ''
            }`}
            icon={faCaretDown}
          />
          <div className="Navigation-TopNavigationUser-Text">
            <div className="Navigation-TopNavigationUser-Name">
              {props.me.firstname} {props.me.lastname}
            </div>
            <div className="Navigation-TopNavigationUser-Role">
              Administrator
            </div>
          </div>
          <img
            src={props.me.image}
            alt=""
            aria-hidden="true"
            className="Navigation-TopNavigationUser-Avatar"
          />
        </button>
      </div>
      {userMenuOpen && (
        <div className="Navigation-TopNavigationUserMenu">
          <NavLink
            className="Navigation-TopNavigationUserMenu-Link"
            to="/settings"
          >
            <span
              className="Navigation-TopNavigationUserMenu-LinkEmoji"
              role="img"
              aria-label="Cogwheel"
            >
              ⚙️
            </span>
            Settings
          </NavLink>
          <NavLink
            className="Navigation-TopNavigationUserMenu-Link"
            to="/administration"
          >
            <span
              className="Navigation-TopNavigationUserMenu-LinkEmoji"
              role="img"
              aria-label="DNA"
            >
              🧬
            </span>
            Administration
          </NavLink>
          <NavLink
            className="Navigation-TopNavigationUserMenu-Link"
            to="/logout"
          >
            <span
              className="Navigation-TopNavigationUserMenu-LinkEmoji"
              role="img"
              aria-label="Exit"
            >
              🚫
            </span>
            Logout
          </NavLink>
        </div>
      )}
    </div>
  );
};

Navigation.propTypes = {
  me: PropTypes.shape({
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    image: PropTypes.string,
  }).isRequired,
};

export default Navigation;
