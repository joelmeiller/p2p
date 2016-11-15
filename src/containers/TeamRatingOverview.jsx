// React imports
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Component imports
import ProgressPageContainer from './ProgressPageContainer.jsx';
import TeamRatingPageContainer from './TeamRatingPageContainer.jsx';

// Action imports
import { fetchTeam } from '../actions/team.js';

// Utils impors
import calculateProgress from '../middleware/utils/calculateProgress.js';
import { getActiveRoleShortcut } from '../middleware/utils/activeRole.js';


class TeamRatingOverviewComponent extends Component {
  componentDidMount() {
    this.props.fetchTeam();
  }

  render() {
    const ratings = this.props.members.filter(member => member.studentId === this.props.user.id);
    const memberRating = ratings.length === 1 ? ratings[0] : {};

    return ((this.props.location.pathname !== '/ip-p2p/team/rating' && this.props.isQM) || this.props.isFinal ?
      <div className="container push-top-small">
        <h2>Bewertungsübersicht</h2>
        <TeamRatingPageContainer {...this.props} />
      </div> :
      <div className="container push-top-small">
        <h2>Bewertungsfortschritt</h2>
        <ProgressPageContainer
          {...memberRating}
          initialRatings={memberRating.ratings}
          isFinal={this.props.isFinal}
        />
      </div>
    );
  }
}

TeamRatingOverviewComponent.propTypes = {
  fetchTeam: React.PropTypes.func,
  isQM: React.PropTypes.bool,
  isFinal: React.PropTypes.bool,
  location: React.PropTypes.object,
  members: React.PropTypes.array,
  user: React.PropTypes.object,
};

const mapStateToProps = (globalState, props) => {
  const { user } = globalState.app;
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
    user,
    ...props,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchTeam: isQM => dispatch(fetchTeam(isQM)),
});

const TeamRatingOverview = connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamRatingOverviewComponent);

export default TeamRatingOverview;
