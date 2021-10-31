import React, { useState } from "react";
import { Link as RouterLink, useHistory } from 'react-router-dom';

import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

import Api from '../api';
import Form from './Form';
import Session from '../Session';

const styles = {
  mt: '1em',
  '& form': { mt: '1em' }
};

const Signup = () => {

  const [error, setError] = useState('');
  const history = useHistory();

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

  return (
    <Container maxWidth='sm' sx={styles}>
      <Link component={RouterLink} to='/' underline='hover'>
        Home
      </Link>
      <Form onSubmit={onSubmit} error={error}></Form>
    </Container>
  );
};

export default Signup;
