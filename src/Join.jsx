import React from "react";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';

import welcomeTheme from './ui/themes/welcome';

const Join = () => (
  <ThemeProvider theme={welcomeTheme}>
    <div className="welcome">
      <Typography variant='h1'>
        Hooray! You're about to join our beta
      </Typography>
      <Typography variant='h3'>
        Hush hush - right now we are invite only
      </Typography>
      <TextField id="access-code" label="Enter access code" />
      <p>
        <Button variant="contained" color='success' size='large'>
          Submit
        </Button>
      </p>
    </div>
  </ThemeProvider>
);

export default Join;
