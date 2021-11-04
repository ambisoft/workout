import React from "react";
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';

import welcomeTheme from './ui/themes/welcome';

const Home = () => (
  <ThemeProvider theme={welcomeTheme}>
    <div className="welcome">
      <Typography variant='h1'>
        Workout.io&nbsp;β
      </Typography>
      <Typography variant='h3' textAlign='center' ml={1} mr={1}>
        Next-generation workout<br/>platform
      </Typography>
      <img src='/logo.png' alt='Running man' height='313' />
      <Box mt={2}>
        <Button component={Link} to='/join' variant="contained" color='success' size='large'>
          Join Beta
        </Button>
      </Box>
    </div>
  </ThemeProvider>
);

export default Home;
