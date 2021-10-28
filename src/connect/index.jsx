import React, { useEffect } from "react";
import Button from '@mui/material/Button';

import Api from '../api';

const Connect = () => {

  useEffect(() => {
    Api.ping();
  });

  // Strava config
  const client_id = process.env.REACT_APP_STRAVA_CLIENT_ID;
  const scope = 'activity:read';
  const redirect_uri=`${window.location.origin}/connect/strava`;
  const strava = `https://www.strava.com/oauth/authorize?client_id=${client_id}&response_type=code&scope=${scope}&redirect_uri=${encodeURIComponent(redirect_uri)}`;

  return (
    <div>
      <Button component={'a'} href={strava} variant="contained" size='large'>
        Connect Strava
      </Button>
    </div>
  );
};

export default Connect;
