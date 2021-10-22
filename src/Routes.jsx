import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from './Home';
import Signup from './Signup';

const Routes = () => (
  <Switch>
    <Route path="/join" component={Signup} />
    <Route path="/" component={Home} />
  </Switch>
);

export default Routes;
