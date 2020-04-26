import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { useMutation } from '@apollo/react-hooks';
import sha512 from 'sha512';

import history from '../../logic/history';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Modal from '../../components/Modal';

import SignUpMutation from './SignUp.gql';

const validators = {
  email: [
    {
      required: true,
      error: 'Please provide an E-Mail Address...',
    },
    {
      type: 'email',
      error: "Your E-Mail doesn't seem to be valid...",
    },
  ],
  username: [
    {
      required: true,
      error: 'Please provide a username...',
    },
    {
      min: 2,
      max: 15,
      error:
        'Your username has to be at least 2 and no more than 15 characters long...',
    },
    {
      type: 'username',
      error:
        'Your username may only contain lowercase, uppercase and numeric characters...',
    },
  ],
  password: [
    {
      required: true,
      error: 'Please provide a password...',
    },
    {
      min: 6,
      error: 'Your Password has to be at least 6 characters long...',
    },
    {
      type: 'password',
      error:
        'Your Password must contain at least one lowercase, one uppercase and one numeric character...',
    },
  ],
  firstname: [
    {
      required: true,
      error: 'Please provide a firstname...',
    },
  ],
  lastname: [
    {
      required: true,
      error: 'Please provide a lastname...',
    },
  ],
};

const SignUp = (_props) => {
  const [signUp] = useMutation(SignUpMutation);

  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
      firstname: '',
      lastname: '',
    },
    onSubmit: ({ email, username, password, firstname, lastname }) => {
      const hashedPassword = sha512(password).toString('hex');
      signUp({
        variables: {
          email,
          username,
          password: hashedPassword,
          firstname,
          lastname,
        },
      })
        .then(({ data }) => {
          const { id } = data.register;
          if (id) {
            history.push('/login');
          } else {
            throw new Error('Help!');
          }
        })
        .catch(() => {
          throw new Error('Help!');
        });
    },
  });

  return (
    <>
      <div className="SignUp-Image" />
      <Modal open>
        <h2>Sign up</h2>
        <form onSubmit={formik.handleSubmit}>
          <Input
            validator={validators.firstname}
            onChange={(value) => {
              return formik.setFieldValue('firstname', value);
            }}
            name="firstname"
            label="Firstname"
            autoComplete="given-name"
          />
          <Input
            validator={validators.lastname}
            onChange={(value) => {
              return formik.setFieldValue('lastname', value);
            }}
            name="lastname"
            label="Lastname"
            autoComplete="family-name"
          />
          <Input
            validator={validators.username}
            onChange={(value) => {
              return formik.setFieldValue('username', value);
            }}
            name="username"
            label="Username"
            autoComplete="nickname"
          />
          <Input
            validator={validators.email}
            onChange={(value) => {
              return formik.setFieldValue('email', value);
            }}
            name="email"
            label="E-Mail"
            autoComplete="email"
          />
          <Input
            validator={validators.password}
            onChange={(value) => {
              return formik.setFieldValue('password', value);
            }}
            name="password"
            type="password"
            label="Password"
            autoComplete="new-password"
          />
          <Button
            align="right"
            big
            onClick={() => {
              return formik.submitForm();
            }}
          >
            Sign Up!
          </Button>
        </form>
        <hr />
        <center>
          Already have an account? <Link to="/login">Login</Link>
        </center>
      </Modal>
    </>
  );
};

SignUp.propTypes = {};

SignUp.defaultProps = {};

export default SignUp;
