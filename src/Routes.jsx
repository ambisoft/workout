import React from "react";
import { Switch, Route } from "react-router-dom";

import Contests from './Contests';
import Dashboard from './Dashboard';
import Home from './Home';
import Join from './Join';
import Login from './login';
import Signup from './signup';

import Connect from './connect';
import PolarConnect from './connect/Polar';
import StravaConnect from './connect/Strava';

const Routes = () => (
  <Switch>
    <Route path="/contests" component={Contests} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/join" component={Join} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/connect/polar" component={PolarConnect} />
    <Route path="/connect/strava" component={StravaConnect} />
    <Route path="/connect" component={Connect} />
    <Route path="/" component={Home} />
  </Switch>
);

export default Routes;
