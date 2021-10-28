import React, { useEffect } from "react";
import Button from '@mui/material/Button';

import Api from '../api';

const CONFIG = {
  STRAVA: {
    base: 'https://www.strava.com/oauth/authorize',
    client_id: process.env.REACT_APP_STRAVA_CLIENT_ID,
    redirect_uri: `${window.location.origin}/connect/strava`,
    scope: 'activity:read'
  },

  POLAR: {
    base: 'https://flow.polar.com/oauth2/authorization',
    client_id: process.env.REACT_APP_POLAR_CLIENT_ID,
    redirect_uri: `${window.location.origin}/connect/polar`,
    scope: 'accesslink.read_all'
  }
};

function buildURL(config) {
  const params = [
    `client_id=${config.client_id}`,
    `response_type=code`,
    `scope=${config.scope}`,
    `redirect_uri=${encodeURIComponent(config.redirect_uri)}`
  ];
  return `${config.base}?${params.join('&')}`;
};

const Connect = () => {
  useEffect(() => {
    Api.ping();
  });

  const urls = {
    polar: buildURL(CONFIG.POLAR),
    strava: buildURL(CONFIG.STRAVA)
  }

  return (
    <div>
      <Button component={'a'} href={urls.strava} variant="contained" size='large'>
        Connect Strava
      </Button>
      <Button style={{opacity: 0}} component={'a'} href={urls.polar} variant="contained" size='large'>
        Connect Polar
      </Button>
    </div>
  );
};

export default Connect;
