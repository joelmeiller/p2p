// React imports
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Component imports
import Inbox from './Inbox.jsx';
import ProjectOverview from './ProjectOverview.jsx';
import TeamRatingOverview from './TeamRatingOverview.jsx';
import ProgressPageContainer from './ProgressPageContainer.jsx';


const Dashboard = props => (
  <div>
    {(props.user ?
      <div>
        <Inbox />
        {(props.user.isCoach ? <ProjectOverview /> : undefined)}
        {(props.user.isQM ? <TeamRatingOverview /> : undefined)}
        {(!props.user.isCoach && !props.user.isQM ? <ProgressPageContainer /> : undefined)}
      </div> : undefined
    )}
  </div>
);

Dashboard.propTypes = {
  user: React.PropTypes.object,
};

const mapStateToProps = (globalState, props) => {
  const { user } = globalState.app;

  return {
    user,
  };
};


const DashboardComponent = connect(
  mapStateToProps
)(Dashboard);

export default withRouter(DashboardComponent);
