import React, { useEffect, useState } from "react";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import Api from '../api';
import Oauth from './oauth';

const style = {
  marginTop: 20,
  justifyContent: 'center'
};

const Connect = () => {

  const [sources, setSources] = useState([]);
  // TODO: return "connected" status for each source
  useEffect(() => Api.sources().then(setSources), []);

  // TEST: preload Strava activities
  // - if works, move to connect/strava/Button'
  // load/refresh activities - determines whether the token works or not

  useEffect(() => {
    console.log('load activities');
    Api.Strava.activities().then(resp => {
      console.log('resp:', resp);
    });
  }, [])

  return (
    <Grid container spacing={2} style={style}>
      {sources.map(source => (
        <Grid key={source.name} item>
          <Button
            component={'a'}
            href={Oauth.url(source)}
            variant="contained"
            size='large'>Connect {source.name}</Button>
        </Grid>
      ))}
    </Grid>
  );
};

export default Connect;
