import React from "react";

import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

const DistanceCard = ({ title, distance }) => (
  <Card elevation={1} sx={{padding: 3}}>
    <Typography variant='subtitle2' component='h6' fontWeight={600}>
      {title}
    </Typography>
    <Typography variant='h3' fontSize='1.875rem' fontWeight={700}>
      {distance}km
    </Typography>
  </Card>
);

export default DistanceCard;
