// React imports
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

// Component imports
import ProgressPage from '../ui/pages/ProgressPage.jsx';
import TeamRatingPage from '../ui/pages/TeamRatingPage.jsx';

// Action imports
import { setTitle } from '../actions/app.js';
import { fetchTeam } from '../actions/team.js';
import { showMember } from '../actions/member.js';

// Utils impors
import calculateProgress from '../middleware/utils/calculateProgress.js';


class TeammemberOverviewComponent extends Component {
  componentDidMount() {
    this.props.setTitle();
    this.props.fetchTeam(this.props.isQM);
  }

  render() {
    return (this.props.isQM ?
      <TeamRatingPage {...this.props} /> :
      <ProgressPage {...this.props} />);
  }
}

TeammemberOverviewComponent.propTypes = {
  setTitle: React.PropTypes.func,
  fetchTeam: React.PropTypes.func,
  isQM: React.PropTypes.bool,
};

const mapStateToProps = (globalState, props) => {
  const { members, readonly } = globalState.team;

  const updatedMembers = members.map(member => ({
    ...member,
    progress: calculateProgress(member),
  }));

  return {
    title: 'Rating for',
    readonly,
    members: updatedMembers,
    ...props,
  };
};

const mapDispatchToProps = dispatch => ({
  setTitle: () => dispatch(setTitle('Dashboard')),
  fetchTeam: () => dispatch(fetchTeam()),
  handleSelectMember: (member, props) => dispatch(showMember(member, props)),
});

const TeammemberOverview = connect(
  mapStateToProps,
  mapDispatchToProps
)(TeammemberOverviewComponent);

export default withRouter(TeammemberOverview);
