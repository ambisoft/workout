import React from "react";
import { Redirect, Route } from "react-router-dom";

import Session from '../Session';

const PrivateRoute = ({ component: Component, ...rest }) => {

  const user = Session.user;
  const unknown = (user === undefined);
  const visitor = (user === null);

  console.log('PrivateRoute: user is', user);

  return (
    <Route
      {...rest}
      render={routeProps => (
        visitor ? (
          <Redirect to={'/login'} />
        ) : (unknown ? null : <Component {...routeProps} />)
      )}
    />
  );
};

export default PrivateRoute;
