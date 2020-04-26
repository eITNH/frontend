import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { useMutation } from '@apollo/react-hooks';
import sha512 from 'sha512';

import history from '../../logic/history';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Modal from '../../components/Modal';

import { LoginMutation } from './Login.gql';

const validators = {
  email: [
    {
      required: true,
      error: 'Please enter your E-Mail or Username...',
    },
  ],
  password: [
    {
      required: true,
      error: 'Please enter your Password...',
    },
  ],
};

const Login = (_props) => {
  const [login] = useMutation(LoginMutation);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: ({ email, password }) => {
      const hashedPassword = sha512(password).toString('hex');
      login({
        variables: {
          login: email,
          password: hashedPassword,
        },
      })
        .then(({ data }) => {
          if (data) {
            const { id, token } = data.login;
            if (id && token) {
              // Login was successfull
              localStorage.setItem('token', token);
              history.push('/');
            } else {
              throw new Error('Help!');
            }
          }
        })
        .catch((error) => {
          throw new Error(error);
        });
    },
  });

  return (
    <>
      <div className="Login-Image" />
      <Modal open>
        <h2>Login</h2>
        <form onSubmit={formik.handleSubmit}>
          <Input
            label="E-Mail / Username"
            name="email"
            autoComplete="email"
            validator={validators.email}
            onChange={(value) => {
              return formik.setFieldValue('email', value);
            }}
          />
          <Input
            type="password"
            label="Password"
            name="password"
            autoComplete="current-password"
            validator={validators.password}
            onChange={(value) => {
              return formik.setFieldValue('password', value);
            }}
          />
          <Button align="right" onClick={formik.submitForm} big>
            Login
          </Button>
        </form>
        <hr />
        <center>
          Don&apos;t have an account yet? No problem! <br />
          You can just <Link to="/sign-up">Sign up!</Link>
        </center>
      </Modal>
    </>
  );
};

Login.propTypes = {};

Login.defaultProps = {};

export default Login;
