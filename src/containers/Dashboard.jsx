// React imports
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Component imports
import Inbox from './Inbox.jsx';
import ProjectOverview from './ProjectOverview.jsx';
import TeamRatingOverview from './TeamRatingOverview.jsx';
import ProgressPageContainer from './ProgressPageContainer.jsx';

// Actions imports
import { getUserSettings } from '../actions/app.js';

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.refreshUserSettings();
  }

  render() {
    return (
      <div>
        {(this.props.user ?
          <div>
            <Inbox />
            {(this.props.user.isCoach ? <ProjectOverview /> : undefined)}
            {(this.props.user.isQM ? <TeamRatingOverview /> : undefined)}
            {(!this.props.user.isCoach && !this.props.user.isQM ? <ProgressPageContainer /> : undefined)}
          </div> : undefined
        )}
      </div>
    );
  }
}

Dashboard.propTypes = {
  user: React.PropTypes.object,
};

const mapStateToProps = (globalState, props) => {
  const { user } = globalState.app;

  return {
    user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  refreshUserSettings: () => dispatch(getUserSettings()),
});


const DashboardComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

export default withRouter(DashboardComponent);
