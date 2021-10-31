import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";

import Container from '@mui/material/Container';

import Api from '../api';
import Form from './Form';
import Session from '../Session';

const Signup = () => {

  const [error, setError] = useState('');
  const history = useHistory();

  const user = Session.user;
  const unknown = (user === undefined);
  const visitor = (user === null);

  const onSubmit = (username, password) => {
    setError('');
    Api.users.create(username, password).then(resp => {
      if (resp.token) {
        if (resp.user) {
          Session.setUser(resp.user);
        }
        history.push('/dashboard');
      }
    }).catch(e => {
      setError(e.response.data.error);
    });
  };

  if (unknown) {
    return null;
  }
  if (!visitor) {
    return <Redirect to='/dashboard'></Redirect>;
  }
  return (
    <Container maxWidth='sm' sx={{ mt: '2.5em'}}>
      <Form onSubmit={onSubmit} error={error}></Form>
    </Container>
  );
};

export default Signup;
