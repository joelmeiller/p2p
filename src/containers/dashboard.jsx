import React from 'react';

import { default as DashboardPage } from '../ui/pages/Dashboard.jsx';

const Dashboard = (props) => (
  <DashboardPage
    title="Test"
    {...props}
  />
);

Dashboard.propTypes = {
  title: React.PropTypes.string,
};

export default Dashboard;
