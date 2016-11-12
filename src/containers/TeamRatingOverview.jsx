// React imports
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

// Component imports
import ProgressPage from '../ui/pages/ProgressPage.jsx';
import TeamRatingPage from '../ui/pages/TeamRatingPage.jsx';

// Action imports
import { fetchTeam } from '../actions/team.js';
import { showMember } from '../actions/member.js';

// Utils impors
import calculateProgress from '../middleware/utils/calculateProgress.js';
import { getActiveRoleShortcut } from '../middleware/utils/activeRole.js';


class TeamRatingOverviewComponent extends Component {
  componentDidMount() {
    this.props.fetchTeam(false);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.user && this.props.user.isQM !== nextProps.user.isQM
      && nextProps.location.pathname === '/ip-p2p' ) {
      this.props.fetchTeam(true);
    }
    console.log(this.props.location, nextProps.location);
    if (this.props.location.pathname !== nextProps.location.pathname
      && nextProps.location.pathname !== '/ip-p2p' ) {
      this.props.fetchTeam(false);
    }
  }

  render() {
    return (this.props.isQM || this.props.isFinal ?
      <div className="container push-top-small">
        <h2>Bewertungsübersicht</h2>
        <TeamRatingPage {...this.props} />
      </div> :
      <div className="container push-top-small">
        <h2>Bewertungsfortschritt</h2>
        <ProgressPage {...this.props} />
      </div>);
  }
}

TeamRatingOverviewComponent.propTypes = {
  fetchTeam: React.PropTypes.func,
  isQM: React.PropTypes.bool,
  isFinal: React.PropTypes.bool,
};

const mapStateToProps = (globalState, props) => {
  const { members, readonly } = globalState.team;

  const updatedMembers = members.map(member => ({
    ...member,
    progress: calculateProgress(member),
    activeRole: getActiveRoleShortcut(member.roles),
  }));

  return {
    title: 'Rating for',
    onClosePath: '/ip-p2p',
    readonly,
    members: updatedMembers,
    ...props,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchTeam: (isQM) => dispatch(fetchTeam(isQM)),
  handleSelectMember: (member, props) => dispatch(showMember(member, props)),
});

const TeamRatingOverview = connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamRatingOverviewComponent);

export default withRouter(TeamRatingOverview);
