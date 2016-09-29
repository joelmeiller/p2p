// React imports
import React from 'react';
import { connect } from 'react-redux';

// Component imports
import Inbox from './Inbox.jsx';
import ProjectOverview from './ProjectOverview.jsx';
import TeammemberOverview from './TeammemberOverview.jsx';


const Dashboard = props => (
  <div>
    <Inbox />
    {(props.isCoach ?
      <ProjectOverview /> :
      <TeammemberOverview />)
    }
  </div>
);

Dashboard.propTypes = {
  isCoach: React.PropTypes.bool,
};

const mapStateToProps = (globalState, props) => {
  const { isCoach } = globalState.app;

  return {
    isCoach,
    ...props,
  };
};


const DashboardComponent = connect(
  mapStateToProps
)(Dashboard);

export default DashboardComponent;
