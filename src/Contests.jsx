import React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const Item = styled(Card)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  //color: theme.palette.text.secondary,
}));

const Contests = () => {

  const contests = [
    { distance: 100, start_date: '1.10.2021', end_date: '31.10.2021' },
    { distance: 200, start_date: '1.10.2021', end_date: '31.10.2021' },
    { distance: 300, start_date: '1.10.2021', end_date: '15.11.2021' },
    { distance: 500, start_date: '1.10.2021', end_date: '30.11.2021' },
    { distance: 999, start_date: '1.10.2021', end_date: '31.12.2021' },
    { distance: 3999, start_date: '1.10.2021', end_date: '1.3.2022' },
  ];

  return (
    <div className='content'>
      <h1>Contests</h1>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {contests.map(contest => (
          <Grid item xs={6} md={4}>
            <Item>
              <CardContent>
                <Typography variant="h2">
                  {contest.distance}km
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                  Started: {contest.start_date}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                  Ends: {contest.end_date}
                </Typography>
                <Button variant='outlined'>Join</Button>
              </CardContent>
            </Item>
          </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default Contests;
