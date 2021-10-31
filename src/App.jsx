import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';

import { getAuth, onAuthStateChanged } from 'firebase/auth';

import mainTheme from './ui/themes/main';

import './App.css';

import Api from './api';
import Firebase from './api/Firebase';
import Routes from "./routes";
import Session from './Session';

const App = () => {

  const [user, setUser] = useState();

  useEffect(() => {
    Firebase.init();
    Api.me().then(_user => {
      Session.setUser(_user);
      // re-render
      setUser(_user);
    });
    /*
    const auth = getAuth();
    onAuthStateChanged(auth, user => {
      Session.setUser(user);
      // re-render
      setUser(user);
    });
    */
  }, []);

  return (
    <ThemeProvider theme={mainTheme}>
      <div className="app">
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
};

export default App;
