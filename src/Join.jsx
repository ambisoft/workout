import React from "react";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';

import Alert from './Alert';
import Api from './api';

import welcomeTheme from './ui/themes/welcome';

const styles = {
  mt: '1em',
  mb: '2em',
  '& span': {
    m: 2,
    lineHeight: 2.5,
  }
};

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
        <Typography variant='h1' textAlign='center'>
          Hooray! You're about to join our beta
        </Typography>
        <Typography variant='h3'>
          Hush hush - right now we are invite only
        </Typography>
        <Box sx={styles}>
          <TextField id="access-code" label="Enter access code" />
          <span> or </span>
          <TextField
            id="email"
            value={email}
            onChange={onChangeEmail}
            onKeyUp={onKeyUp}
            label="Leave your email" />
        </Box>
        <Button variant="contained" color='success' size='large' onClick={onSend}>
          Submit
        </Button>
      </div>
      {showAlert && <Alert onClose={onAlertClose} />}
    </ThemeProvider>
  );
};

export default Join;
