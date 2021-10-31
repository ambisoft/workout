import React from "react";
import { Redirect, useHistory } from 'react-router-dom';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';

import welcomeTheme from './ui/themes/welcome';

import Session from './Session';
import Tokens from './api/Tokens';

const Dashboard = () => {
  const history = useHistory();

  const user = Session.user;
  const unknown = (user === undefined);
  const visitor = (user === null);

  const onLogout = () => {
    Tokens.clear();
    Session.setUser(null);
    history.push('/login');
  };

  if (unknown) {
    return null;
  }
  if (visitor) {
    return <Redirect to='/login'></Redirect>;
  }

  return (
    <ThemeProvider theme={welcomeTheme}>
      <div className="welcome">
        <Typography variant='h1'>
          Dashboard
        </Typography>
        <img src='/logo.png' alt='Running man logo' />
        <p>
          <Button variant="contained" color='success' size='large' onClick={onLogout}>
            Logout
          </Button>
        </p>
      </div>
    </ThemeProvider>
  );
};

export default Dashboard;
