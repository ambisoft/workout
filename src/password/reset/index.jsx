import React, { useState } from "react";
import { Link as RouterLink, useHistory } from 'react-router-dom';

import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

import Api from '../../api';
import Form from './Form';
import Session from '../../Session';

const styles = {
  mt: '1em',
  '& form': { mt: '1em' }
};

const PasswordReset = () => {

  const [error, setError] = useState('');
  const history = useHistory();

  // TODO: read from params
  const resetCode = '';

  const onSubmit = (password, passwordConfirmation) => {
    if (password !== passwordConfirmation) {
      setError('Passwords do not match');
    } else {
      Api.users.setPassword(resetCode, password).then(resp => {
        if (resp.token) {
          if (resp.user) {
            Session.setUser(resp.user);
          }
          history.push('/dashboard');
        }
      }).catch(e => {
        setError(e.response.data.error);
      });
    }
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

export default PasswordReset;
