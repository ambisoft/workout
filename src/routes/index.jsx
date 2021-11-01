import React from "react";
import { Switch, Route } from "react-router-dom";

import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

import Contests from '../Contests';
import Dashboard from '../dashboard';
import Home from '../Home';
import Join from '../Join';
import Login from '../login';
import Signup from '../signup';

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
    <Route path="/" component={Home} />
  </Switch>
);

export default Routes;
