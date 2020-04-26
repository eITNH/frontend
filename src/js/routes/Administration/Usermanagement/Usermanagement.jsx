import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { NavLink } from 'react-router-dom';
import { format, parse } from 'date-fns';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import Loader from '../../../components/Loader';

import UsermanagementQuery from './Usermanagement.gql';

const Usermanagement = () => {
  const [searchString, setSearchString] = useState('');
  const { data, loading } = useQuery(UsermanagementQuery, {});

  if (loading) {
    return <Loader />;
  }

  const users = data.users.filter((user) => {
    return [
      user.studentId ? user.studentId : '',
      user.lastname,
      user.firstname,
      user.email,
      user.type,
    ]
      .map((e) => {
        return e.toLowerCase();
      })
      .some((v) => {
        return v.indexOf(searchString) >= 0;
      });
  });

  return (
    <div className="Usermanagement-Content">
      <div className="Usermanagement-Title">Usermanagement</div>
      <div className="Usermanagement-Search">
        <FontAwesomeIcon
          icon={faSearch}
          className="Usermanagement-SearchIcon"
        />
        <input
          type="text"
          placeholder="Search..."
          onChange={(event) => {
            setSearchString(event.target.value.toLowerCase());
          }}
          className="Usermanagement-SearchInput"
        />
      </div>
      <div className="Usermanagement-Table">
        <div className="Usermanagement-TableHead">
          <div
            className="Usermanagement-TableHead-Col"
            style={{ minWidth: '10%', maxWidth: '10%' }}
          >
            Studenten ID
          </div>
          <div
            className="Usermanagement-TableHead-Col"
            style={{ minWidth: '20%', maxWidth: '20%' }}
          >
            Lastname
          </div>
          <div
            className="Usermanagement-TableHead-Col"
            style={{ minWidth: '20%', maxWidth: '20%' }}
          >
            Firstname
          </div>
          <div
            className="Usermanagement-TableHead-Col"
            style={{ minWidth: '15%', maxWidth: '15%' }}
          >
            Benutzername
          </div>
          <div
            className="Usermanagement-TableHead-Col"
            style={{ minWidth: '15%', maxWidth: '15%' }}
          >
            E-Mail
          </div>
          <div
            className="Usermanagement-TableHead-Col"
            style={{ minWidth: '10%', maxWidth: '10%' }}
          >
            Erstellt
          </div>
          <div
            className="Usermanagement-TableHead-Col"
            style={{ minWidth: '10%', maxWidth: '10%' }}
          >
            Role
          </div>
        </div>
        <div className="Usermanagement-TableBody">
          {users.map((user) => {
            return (
              <NavLink
                key={user.id}
                to={`/administration/users/${user.id}`}
                className="Usermanagement-TableRow"
              >
                <div
                  className="Usermanagement-TableRow-Col"
                  style={{ minWidth: '10%', maxWidth: '10%' }}
                >
                  {user.studentId}
                </div>
                <div
                  className="Usermanagement-TableRow-Col"
                  style={{ minWidth: '20%', maxWidth: '20%' }}
                >
                  {user.lastname}
                </div>
                <div
                  className="Usermanagement-TableRow-Col"
                  style={{ minWidth: '20%', maxWidth: '20%' }}
                >
                  {user.firstname}
                </div>
                <div
                  className="Usermanagement-TableRow-Col"
                  style={{ minWidth: '15%', maxWidth: '15%' }}
                >
                  {user.username}
                </div>
                <div
                  className="Usermanagement-TableRow-Col"
                  style={{ minWidth: '15%', maxWidth: '15%' }}
                >
                  {user.email}
                </div>

                <div
                  className="Usermanagement-TableRow-Col"
                  style={{ minWidth: '10%', maxWidth: '10%' }}
                >
                  {format(
                    parse(user.createdAt, 'yyyy-MM-dd HH:mm:ss', new Date()),
                    'dd.MM.yyyy HH:mm',
                  )}
                </div>
                <div
                  className="Usermanagement-TableRow-Col"
                  style={{ minWidth: '10%', maxWidth: '10%' }}
                >
                  {user.type.charAt(0).toUpperCase() +
                    user.type.slice(1).toLowerCase()}
                </div>
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Usermanagement;
