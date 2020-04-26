import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { NavLink } from 'react-router-dom';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import Loader from '../../../components/Loader';

import AdminDashboardQuery from './Dashboard.gql';

const Dashboard = () => {
  const { data, loading } = useQuery(AdminDashboardQuery, {});

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="Dashboard-Content">
      <div className="Infobox">Welcome in the Admin Area of eITNH!</div>
      <div className="Dashboard-Title">Management</div>
      <div className="Management-Wrapper">
        <div className="Management-Block">
          <NavLink to="/administration/users" className="Management-BlockTitle">
            Usermanagement
          </NavLink>
          <div className="Management-BlockStatistic">
            <div className="Management-BlockStatistic-Title">Users</div>
            <div className="Management-BlockStatistic-Value">
              {data.users.length}
            </div>
          </div>
          <div className="Management-BlockList-Title">Newest Users</div>
          <div className="Management-BlockList">
            {data.users ? (
              data.users.map((user) => {
                return (
                  <div
                    key={user.id}
                    className="Management-BlockList-LinkWrapper"
                  >
                    <NavLink
                      to={`/administation/users/${user.id}`}
                      className="Management-BlockList-Link"
                    >
                      {user.lastname}, {user.firstname}
                    </NavLink>
                    <div className="Management-BlockList-LinkTime">
                      {user.createdAt}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="Management-BlockList-Error">
                Pretty empty here...
              </div>
            )}
          </div>
        </div>
        <div className="Management-Block">
          <NavLink
            to="/administration/courses"
            className="Management-BlockTitle"
          >
            Coursemanagement
          </NavLink>
          <div className="Management-BlockStatistic">
            <div className="Management-BlockStatistic-Title">Courses</div>
            <div className="Management-BlockStatistic-Value">
              {data.courses.length}
            </div>
          </div>
          <div className="Management-BlockList-Title">Newest Courses</div>
          <div className="Management-BlockList">
            {data.courses.length ? (
              data.courses.map((course) => {
                return (
                  <div
                    key={course.id}
                    className="Management-BlockList-LinkWrapper"
                  >
                    <NavLink
                      to={`/course/${course.id}`}
                      className="Management-BlockList-Link"
                    >
                      {course.title}
                    </NavLink>
                  </div>
                );
              })
            ) : (
              <div className="Management-BlockList-Error">
                Pretty empty here...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
