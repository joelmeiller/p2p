// React imports
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

// Component imports
import TeamRatingPage from '../ui/pages/TeamRatingPage.jsx';

// Action imports
import { closeProject } from '../actions/app';
import { fetchTeam, showMemberRating } from '../actions/team.js';

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
  const canSubmit = members.length > 0 && !members.find(m => !m.isAccepted);

  const updatedMembers = members.map(member => ({
    ...member,
    activeRole: getActiveRoleShortcut(member.roles),
    grade: Math.round((projectGrade + member.deviation) * 10) / 10,
    status: member.isAccepted ? 'Akzeptiert' : 'Offen',
    statusSuccess: member.isAccepted,
  }));



  return {
    ...props,
    title: 'Rating for',
    projectGrade,
    members: updatedMembers,
    project: project || {},
    canSubmit,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchTeam: isQM => dispatch(fetchTeam(isQM)),
  handleSelectMember: (member, props) => dispatch(showMemberRating(member, props)),
  handleCloseProject: () => dispatch(closeProject()),
});

const TeamRatingOverview = connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamRatingOverviewComponent);

export default withRouter(TeamRatingOverview);
