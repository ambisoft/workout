import React from "react";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';

import Alert from './Alert';
import Api from './api';

import welcomeTheme from './ui/themes/welcome';

const Join = () => {

  const [email, setEmail] = React.useState('');
  const [showAlert, setShowAlert] = React.useState(false);

  const onAlertClose = () => {
    setShowAlert(false);
    setEmail('');
  }

  const onChangeEmail = (e) => {
    setEmail(e.target.value.replace(/\s+/g, '').toLowerCase());
  }

  const onSend = () => {
    if (email !== '') {
      Api.emails.add(email);
      setShowAlert(true);
    }
  };

  const onKeyUp = (e) => {
    if (e.key === 'Enter') {
      onSend();
    }
  };

  return (
    <ThemeProvider theme={welcomeTheme}>
      <div className="welcome">
        <Typography variant='h1' textAlign='center' margin={2}>
          /Join Workout.io&nbsp;β
        </Typography>
        <Typography variant='h3' textAlign='center' ml={1} mr={1}>
          Hush hush - currently invite only
        </Typography>
        <Grid container mt={2} mb={3}>
          <Grid item xs={12} md={5} textAlign={{ xs: 'center', md: 'right' }}>
            <TextField id="access-code" label="Enter access code" />
          </Grid>
          <Grid item xs={12} md={2} textAlign='center' padding={1}>
            or
          </Grid>
          <Grid item xs={12} md={5} textAlign={{ xs: 'center', md: 'left' }}>
            <TextField
              id="email"
              value={email}
              onChange={onChangeEmail}
              onKeyUp={onKeyUp}
              label="Leave your email" />
          </Grid>
        </Grid>
        <Button variant="contained" color='success' size='large' onClick={onSend}>
          Submit
        </Button>
      </div>
      {showAlert && <Alert onClose={onAlertClose} />}
    </ThemeProvider>
  );
};

export default Join;
