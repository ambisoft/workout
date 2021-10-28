import React from "react";
import { Switch, Route } from "react-router-dom";

import Contests from './Contests';
import Home from './Home';
import Signup from './Signup';

import Connect from './connect';
import StravaConnect from './connect/Strava';
// import PolarConnect from './connect/Polar';

const Routes = () => (
  <Switch>
    <Route path="/contests" component={Contests} />
    <Route path="/join" component={Signup} />
    <Route path="/connect/strava" component={StravaConnect} />
    <Route path="/connect" component={Connect} />
    <Route path="/" component={Home} />
  </Switch>
);

export default Routes;
