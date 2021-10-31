import React from "react";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';

import welcomeTheme from './ui/themes/welcome';

const styles = {
  mt: '2em',
  mb: '1em',
  width: 170,
};

const Join = () => (
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
      </Box>
      <Button variant="contained" color='success' size='large'>
        Submit
      </Button>
    </div>
  </ThemeProvider>
);

export default Join;
