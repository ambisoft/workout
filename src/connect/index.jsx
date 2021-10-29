import React, { useEffect } from "react";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import Api from '../api';
import Config from './config';

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
    polar: buildURL(Config.POLAR),
    strava: buildURL(Config.STRAVA)
  }

  return (
    <Grid container spacing={2} style={{ minHeight: '100vh' }} alignItems="center" justifyContent="center">
      <Grid item>
        <Button component={'a'} href={urls.strava} variant="contained" size='large'>
          Connect Strava
        </Button>
      </Grid>
      <Grid item>
        <Button component={'a'} href={urls.polar} variant="contained" size='large'>
          Connect Polar
        </Button>
      </Grid>
    </Grid>
  );
};

export default Connect;
