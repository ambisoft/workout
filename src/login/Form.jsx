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
  '& .row': { mt: '1.5em' },
};

const Form = ({ error, onSubmit }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSend = () => {
    if ((username !== '') && (password !== '')) {
      onSubmit(username, password);
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
          Sign in to GlobalRun
        </Typography>

        {error &&
        <Alert className='row' severity="error">
            Invalid email or password
        </Alert>}

        <div style={{ display: 'none' }}>
          <input type='text' autoComplete='new-password' />
          <input type='password' autoComplete='new-password' />
        </div>

        <div className='row'>
          <TextField
            autoComplete="off"
            id='username'
            value={username}
            onChange={e => setUsername(e.target.value)}
            fullWidth
            label="Email address"
            placeholder='Email address' />
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
        <Button
          className='row'
          size='large'
          fullWidth
          color='success'
          onClick={onSend}
          variant='contained'>Login</Button>
        <Box className='row' textAlign='center'>
          <Link component={RouterLink} to='/signup'>Signup</Link>
        </Box>
      </Box>
    </Paper>
  );
};

export default Form;
