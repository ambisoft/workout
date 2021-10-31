import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Api from '../api';
import Form from './Form';
import Session from '../Session';

const Login = () => {

  const [error, setError] = useState(false);

  const user = Session.user;
  const unknown = (user === undefined);
  const visitor = (user === null);

  const onSubmit = (username, password) => {
    Api.sessions.create(username, password).then(resp => {
      if (resp.token) {
        return <Redirect to='/dashboard'></Redirect>;
      }
    });
  };

  if (unknown) {
    return null;
  }
  if (!visitor) {
    return <Redirect to='/dashboard'></Redirect>;
  }
  return (
    <Container maxWidth='sm'>
      <Form onSubmit={onSubmit} error={error}></Form>
    </Container>
  );
};

export default Login;
