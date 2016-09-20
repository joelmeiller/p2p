// React imports
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

// Component imports
import ProgressPage from '../ui/components/ProgressPage.jsx';

// Action imports
import { fetchTeamIfNeeded } from '../actions/team.js';
import { selectMember } from '../actions/member.js';


class TeammemberOverviewComponent extends Component {
  componentDidMount() {
    this.props.fetchTeam('test');
  }

  render() {
    return(
      <ProgressPage
        {...this.props}
      />
    );
  }
}

const mapStateToProps = (globalState) => {
  const { members, isFetching } = globalState.team;

  return {
    members,
    isFetching,
  }
};

const mapDispatchToProps = (dispatch, props) => ({
  fetchTeam: (project) => dispatch(fetchTeamIfNeeded(project)),
  handleSelectMember: (member) => {
    dispatch(selectMember(member));
    props.router.push(`/team/${member.id}`);
  }
});

const TeammemberOverview = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(TeammemberOverviewComponent));

export default TeammemberOverview;
