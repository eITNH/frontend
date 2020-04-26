import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import CourseCard from '../../components/CourseCard';
import DashboardCategory from '../../components/DashboardCategory';
import Loader from '../../components/Loader';

import DashboardQuery from './Dashboard.gql';

const Dashboard = (_props) => {
  const { data, loading, error } = useQuery(DashboardQuery);

  if (loading || error) {
    return <Loader />;
  }

  return (
    <div className="Dashboard">
      <div className="Dashboard-Content">
        <DashboardCategory emoji="🌍" title="My Courses" type="Courses">
          {data.courses.map((course) => {
            return <CourseCard key={course.id} {...course} />;
          })}
        </DashboardCategory>
      </div>
    </div>
  );
};

Dashboard.propTypes = {};

Dashboard.defaultProps = {};

export default Dashboard;
