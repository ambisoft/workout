import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { getAuth, onAuthStateChanged } from 'firebase/auth';

import './App.css';

import Firebase from './api/Firebase';
import Routes from "./Routes";
import Session from './Session';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App = () => {

  const [user, setUser] = useState();

  useEffect(() => {
    Firebase.init();
    const auth = getAuth();
    onAuthStateChanged(auth, user => {
      Session.setUser(user);
      // re-render
      setUser(user);
    });
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
};

export default App;
