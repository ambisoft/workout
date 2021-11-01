import React, { useEffect, useState } from "react";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import Api from '../api';
import Oauth from './oauth';

const style = {
  minHeight: '100vh' ,
  alignItems: 'center',
  justifyContent: 'center'
};

const Connect = () => {

  const [sources, setSources] = useState([]);
  // TODO: return "connected" status for each source
  useEffect(() => Api.sources().then(setSources), []);

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
