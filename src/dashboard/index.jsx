import React from "react";

import Grid from '@mui/material/Grid';

import Connect from '../connect';
import DistanceCard from '../ui/DistanceCard';
import Toolbar from '../ui/Toolbar';

const Dashboard = () => {
  return (
    <div>
      <Toolbar title='Dashboard' />
      <Grid container spacing={3} sx={{mt: 1, p: 1}}>
        <Grid xs={12} md={4} item>
          <DistanceCard title='Weekly Cycling' distance={57} />
        </Grid>
        <Grid xs={12} md={4} item>
          <DistanceCard title='Weekly Running' distance={33} />
        </Grid>
        <Grid xs={12} md={4} item>
          <DistanceCard title='Weekly Swimming' distance={2.5} />
        </Grid>
      </Grid>
      <Connect />
    </div>
  );
};

export default Dashboard;
