import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';

// import CourseJoinQuery from './CourseJoin.gql';
import Loader from '../../../components/Loader';

const Course = (props) => {
  // const { data, loading, error } = useQuery(CourseJoinQuery, {
  //   variables: {
  //     courseId: parseInt(props.match.params.id, 10), // TODO: Add joinCourse function in backend
  //   },
  // });

  // if (loading || error) {
  //   return <Loader />;
  // }

  // if (data.joinCourse === null) {
  //   return <div>Error: No Course found for the Id {props.match.params.id}</div>; // TODO: Add nice Error handling
  // }

  return <div>{props.match.params.id}</div>;
};

Course.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Course;
