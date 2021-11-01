import React from "react";

import Connect from './connect';
import Toolbar from './ui/Toolbar';

const Dashboard = () => {
  return (
    <div>
      <Toolbar title='Dashboard' />
      <Connect />
    </div>
  );
};

export default Dashboard;
