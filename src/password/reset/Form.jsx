import React, { useState } from "react";
import { Link as RouterLink } from 'react-router-dom';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const styles = {
  padding: '2em',
  '& .row': { mt: '1.5em' },
};

const Form = ({ error, onSubmit }) => {

  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const onSend = () => {
    if ((password !== '') && (passwordConfirmation !== '')) {
      onSubmit(password, passwordConfirmation);
    }
  };

  const onKeyUp = (e) => {
    if (e.key === 'Enter') {
      onSend();
    }
  };

  return (
    <Paper elevation={3}>
      <Box component="form" sx={styles} noValidate autoComplete="off">
        <Typography variant='h4'>
          Set New Password
        </Typography>

        {error &&
        <Alert className='row' severity="error">
          {error || 'Password reset error'}
        </Alert>}

        <div style={{ display: 'none' }}>
          <input type='text' autoComplete='new-password' />
          <input type='password' autoComplete='new-password' />
        </div>

        <div className='row'>
          <TextField
            fullWidth
            autoComplete='new-password'
            id='pwd'
            onKeyUp={onKeyUp}
            value={password}
            onChange={e => setPassword(e.target.value)}
            type='password'
            label="Password" />
        </div>

        <div className='row'>
          <TextField
            fullWidth
            autoComplete='new-password'
            id='pwd-confirm'
            onKeyUp={onKeyUp}
            value={passwordConfirmation}
            onChange={e => setPasswordConfirmation(e.target.value)}
            type='password'
            label="Password" />
        </div>
        <Button
          className='row'
          size='large'
          fullWidth
          color='success'
          variant='contained'
          onClick={onSend}>Set Password</Button>
        <Box className='row' textAlign='center'>
          Did you change your mind?
          &nbsp;
          <Link component={RouterLink} to='/login' underline='hover'>
            Login here
          </Link>
        </Box>
      </Box>
    </Paper>
  );
};

export default Form;
