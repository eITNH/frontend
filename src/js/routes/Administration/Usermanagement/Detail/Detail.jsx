import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import { NavLink } from 'react-router-dom';
import { useFormik } from 'formik';

import Loader from '../../../../components/Loader';
import Input from '../../../../components/Input';
import Select from '../../../../components/Select';

import UsermanagementDetailQuery from './Detail.gql';

const UsermanagementDetail = (props) => {
  const { data, loading } = useQuery(UsermanagementDetailQuery, {
    variables: {
      id: parseInt(props.match.params.id, 10),
    },
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: '',
      lastname: '',
      studentId: '',
      type: '',
      username: '',
      email: '',
    },
    onSubmit: ({ firstname, lastname, studentId, type, username, email }) => {},
  });

  if (loading) {
    return <Loader />;
  }

  formik.initialValues = {
    firstname: data.userById.firstname,
    lastname: data.userById.lastname,
    studentId: data.userById.studentId,
    type: data.userById.type,
    username: data.userById.username,
    email: data.userById.email,
  };

  return (
    <div className="UsermanagementDetail-Content">
      <div className="UsermanagementDetail-TopWrapper">
        <div className="UsermanagementDetail-MainBox">
          <div className="UsermanagementDetail-MainBox-Title">
            {data.userById.lastname}, {data.userById.firstname}
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className="UsermanagementDetail-MainBox-List"
          >
            <Input
              label="Student ID:"
              name="studentId"
              defaultValue={data.userById.studentId}
              onChange={(value) => {
                return formik.setFieldValue('studentId', value);
              }}
            />
            <Input
              label="Firstname:"
              name="firstname"
              defaultValue={data.userById.firstname}
              onChange={(value) => {
                return formik.setFieldValue('firstname', value);
              }}
            />
            <Input
              label="Lastname:"
              name="lastname"
              defaultValue={data.userById.lastname}
              onChange={(value) => {
                return formik.setFieldValue('lastname', value);
              }}
            />
            <Input
              label="Username:"
              name="username"
              defaultValue={data.userById.username}
              onChange={(value) => {
                return formik.setFieldValue('username', value);
              }}
            />
            <Input
              label="E-Mail Address:"
              name="email"
              defaultValue={data.userById.email}
              onChange={(value) => {
                return formik.setFieldValue('email', value);
              }}
            />
            <Select
              label="Role:"
              name="type"
              options={[
                {
                  value: 'STUDENT',
                  label: 'Student',
                },
                {
                  value: 'PROFESSOR',
                  label: 'Professor',
                },
              ]}
              defaultValue={data.userById.type}
              onChange={(value) => {
                return formik.setFieldValue('type', value);
              }}
            />
            <div className="UsermanagementDetail-MainBox-Buttons">
              <button type="button">Delete User</button>
              <button type="button">Save</button>
            </div>
          </form>
        </div>
        <div className="UsermanagementDetail-CourseBox">
          <div className="UsermanagementDetail-CourseBox-Title">
            Users Courses ({data.userById.courses.length})
          </div>
          <div className="UsermanagementDetail-CourseBox-List">
            {data.userById.courses.map((course) => {
              return (
                <div
                  key={course.id}
                  className="UsermanagementDetail-CourseBox-ListItem"
                >
                  <NavLink
                    to={`/administration/course/${course.id}`}
                    className="UsermanagementDetail-CourseBox-ListItem-Title"
                  >
                    {course.title}
                  </NavLink>
                  <div className="UsermanagementDetail-CourseBox-ListItem-Button">
                    Remove Course from User
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

UsermanagementDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default UsermanagementDetail;
