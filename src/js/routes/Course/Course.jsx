import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import CourseQuery from './Course.gql';
import Loader from '../../components/Loader';

const Course = (props) => {
  const { data, loading, error } = useQuery(CourseQuery, {
    variables: {
      id: parseInt(props.match.params.id, 10),
    },
  });

  if (loading || error) {
    return <Loader />;
  }

  if (data.courseById === null) {
    return <div>Error: No Course found for the Id {props.match.params.id}</div>; // TODO: Add nice Error handling
  }

  return (
    <div className="Course-Content">
      <div className="Course-Title">{data.courseById.title}</div>
      <div className="Course-Description">{data.courseById.description}</div>
      <div className="Course-StartEnd">
        {data.courseById.start} - {data.courseById.end}
      </div>
      <NavLink
        className="Course-Button Course-Button-Join"
        to={`/course/${props.match.params.id}/join`}
      >
        Join
      </NavLink>
    </div>
  );
};

Course.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Course;
