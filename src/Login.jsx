import React from "react";
import TextField from '@mui/material/TextField';

import Session from './Session';

const Login = () => {
  const user = Session.user;
  const unknown = (user === undefined);
  const visitor = (user === null);

  if (unknown) {
    return null;
  }
  if (!visitor) {
    return <span>Would redirect</span>;
  }
  return (
    <form>
      <div>
        <TextField id="username" label="Username" variant="standard" />
      </div>
      <div>
        <TextField id="password" type='password' label="Password" variant="standard" />
      </div>
    </form>
  );
};

export default Login;
