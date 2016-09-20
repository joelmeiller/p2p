import React from 'react';


const Dashboard = (props) => (
  <div className="page">
    <h1>{props.title}</h1>
  </div>
);

Dashboard.propTypes = {
  title: React.PropTypes.string,
};

export default Dashboard;
