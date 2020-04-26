import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

import Dashboard from '../Dashboard';
import Course from '../Course';
import CourseJoin from '../Course/Join';
import AdminDashboard from '../Administration/Dashboard';
import AdminUsers from '../Administration/Usermanagement';
import AdminUsersDetail from '../Administration/Usermanagement/Detail';

import LoggedInAreaQuery from './LoggedInArea.gql';

const LoggedInArea = () => {
  const { data, loading } = useQuery(LoggedInAreaQuery, {});

  if (loading) {
    return null;
  }

  return (
    <>
      <Navigation {...data} />
      <Switch>
        <Route path="/administration/users/:id" component={AdminUsersDetail} />
        <Route path="/administration/users" component={AdminUsers} />
        <Route path="/administration" component={AdminDashboard} />
        <Route path="/course/:id/join" component={CourseJoin} />
        <Route path="/course/:id" component={Course} />
        <Route component={Dashboard} />
      </Switch>
      <Footer />
    </>
  );
};

export default LoggedInArea;
