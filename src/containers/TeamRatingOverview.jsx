// React imports
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Component imports
import TeamRatingPage from '../ui/pages/TeamRatingPage.jsx';

// Action imports
import { fetchTeam } from '../actions/team.js';
import { showRating } from '../actions/ratings.js';

// Utils impors
import { getActiveRoleShortcut } from '../middleware/utils/activeRole.js';


class TeamRatingOverviewComponent extends Component {
  componentDidMount() {
    this.props.fetchTeam();
  }

  render() {
    return (
      <div className="container push-top-small">
        <h2>Bewertungsübersicht</h2>
        <TeamRatingPage {...this.props} />
      </div>
    );
  }
}

TeamRatingOverviewComponent.propTypes = {
  fetchTeam: React.PropTypes.func,
};

const mapStateToProps = (globalState, props) => {
  const { project } = globalState.app;
  const { members } = globalState.team;

  const projectGrade = project && project.grade ? project.grade : 4;

  const updatedMembers = members.map(member => ({
    ...member,
    activeRole: getActiveRoleShortcut(member.roles),
    grade: projectGrade + member.deviation,
  }));

  return {
    ...props,
    title: 'Rating for',
    projectGrade,
    members: updatedMembers,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchTeam: isQM => dispatch(fetchTeam(isQM)),
  handleSelectMember: member => dispatch(showRating(member, ownProps)),
});

const TeamRatingOverview = connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamRatingOverviewComponent);

export default TeamRatingOverview;
