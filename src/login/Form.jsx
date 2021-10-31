import React from "react";

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const styles = {
  '& .row': { mt: '1.5em' },
};

const Form = ({ error, onSubmit }) => {

  const onClick = (e) => {
    const form = e.currentTarget.form;
    const email = form.querySelector('#username').value;
    const password = form.querySelector('#pwd').value;
    if ((email !== '') && (password !== '')) {
      onSubmit(email, password);
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
            fullWidth
            label="Email address"
            placeholder='Email address' />
        </div>
        <div className='row'>
          <TextField
            fullWidth
            autoComplete='new-password'
            id='pwd'
            type='password'
            label="Password" />
        </div>
        <Button
          className='row'
          size='large'
          fullWidth
          color='success'
          variant='contained'
          onClick={onClick}>Login</Button>
      </Box>
    </Paper>
  );
};

export default Form;
