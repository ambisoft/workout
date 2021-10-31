import React from "react";
import { Switch, Route } from "react-router-dom";

import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

import Contests from '../Contests';
import Dashboard from '../Dashboard';
import Home from '../Home';
import Join from '../Join';
import Login from '../login';
import Signup from '../signup';

import Connect from '../connect';
import PolarConnect from '../connect/Polar';
import StravaConnect from '../connect/Strava';

const Routes = () => (
  <Switch>
    <Route path="/contests" component={Contests} />
    <PrivateRoute path="/dashboard" component={Dashboard} />
    <PublicRoute path="/join" component={Join} />
    <PublicRoute path="/login" component={Login} />
    <PublicRoute path="/signup" component={Signup} />
    <PrivateRoute path="/connect/polar" component={PolarConnect} />
    <PrivateRoute path="/connect/strava" component={StravaConnect} />
    <PrivateRoute path="/connect" component={Connect} />
    <Route path="/" component={Home} />
  </Switch>
);

export default Routes;
