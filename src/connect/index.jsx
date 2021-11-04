import React, { useEffect, useState } from "react";

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';

import Api from '../api';
import Oauth from './oauth';

// TODO: move me?
import Activities from '../dashboard/Activities';

const style = {
  marginTop: 20,
  justifyContent: 'center'
};

const Connect = () => {

  const [activities, setActivities] = useState();
  const [sources, setSources] = useState([]);

  // TODO: return "connected" status for each source
  useEffect(() => Api.sources().then(setSources), []);

  // TODO:
  // -  move to connect/strava/Button'
  // load/refresh activities - determines whether the token works or not

  useEffect(() => {
    console.log('load activities');
    Api.Strava.activities().then(resp => {
      if (resp.data && resp.data.length) {
        setActivities(resp.data);
      }
    });
  }, [])

  return (
    <section>
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
    <Grid container spacing={2}>
    {activities &&
      <Grid xs={12} md={12} item>
          <Activities activities={activities} />
      </Grid>}
    </Grid>
    </section>
  );
};

export default Connect;
