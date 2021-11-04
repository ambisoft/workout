import React, { useState } from "react";
import { Link as RouterLink, useHistory } from 'react-router-dom';

import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

import Api from '../../api';
import Form from './Form';

const styles = {
  mt: '1em',
  '& form': { mt: '1em' }
};

const PasswordForgotten = () => {

  const [error, setError] = useState('');
  const history = useHistory();

  const onSubmit = (email) => {
    if (email !== '') {
      Api.passwords.reset(email).then(resp => {
        // TODO: render success message
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

export default PasswordForgotten;
