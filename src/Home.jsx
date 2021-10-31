import React from "react";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';

import welcomeTheme from './ui/themes/welcome';

const Home = () => (
  <ThemeProvider theme={welcomeTheme}>
  <div className="welcome">
    <Typography variant='h1'>
      Run Forrest Run
    </Typography>
    <img src='/logo.png' alt='Running man logo' />
    <p>
      <Button component={Link} to='/join' variant="contained" color='success' size='large'>
        Join Beta
      </Button>
    </p>
  </div>
  </ThemeProvider>
);

export default Home;
