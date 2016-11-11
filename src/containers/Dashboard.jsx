// React imports
import React from 'react';
import { connect } from 'react-redux';

// Component imports
import Inbox from './Inbox.jsx';
import ProjectOverview from './ProjectOverview.jsx';
import TeamRatingOverview from './TeamRatingOverview.jsx';


const Dashboard = props => (
  <div>
    <Inbox />
    {(props.isJury ?
      <ProjectOverview {...props} /> :
      <TeamRatingOverview {...props} />)
    }
  </div>
);

Dashboard.propTypes = {
  isJury: React.PropTypes.bool,
};

const mapStateToProps = (globalState, props) => {
  const { user } = globalState.app;

  return {
    isJury: user.isJury,
    isQM: user.isQM,
    user,
    ...props,
  };
};


const DashboardComponent = connect(
  mapStateToProps
)(Dashboard);

export default DashboardComponent;
