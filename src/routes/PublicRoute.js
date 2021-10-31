import React from "react";
import { Redirect, Route } from "react-router-dom";

import Session from '../Session';

const PublicRoute = ({ component: Component, ...rest }) => {

  const user = Session.user;
  const unknown = (user === undefined);

  return (
    <Route
      {...rest}
      render={routeProps => (
        !!user ? (
          <Redirect to={'/dashboard'} />
        ) : (unknown ? null : <Component {...routeProps} />)
      )}
    />
  );
};

export default PublicRoute;
