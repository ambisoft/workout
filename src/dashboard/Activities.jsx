import React from "react";

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const Activities = ({ activities }) => (
  <TableContainer component={Paper}>
    <Table aria-label="Activities table">
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell>Type</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Distance</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
      {activities.map(activity => (
        <TableRow key={activity.guid}>
          <TableCell>{activity.details.start_date_local}</TableCell>
          <TableCell>{activity.details.type}</TableCell>
          <TableCell>{activity.name}</TableCell>
          <TableCell>{activity.details.distance}m</TableCell>
        </TableRow>
      ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default Activities;
