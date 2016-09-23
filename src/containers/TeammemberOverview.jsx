// React imports
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

// Component imports
import ProgressPage from '../ui/pages/ProgressPage.jsx';

// Action imports
import { fetchTeamIfNeeded } from '../actions/team.js';
import { selectMember } from '../actions/team.js';
import { setTitle } from '../ui/layouts/app.jsx';


class TeammemberOverviewComponent extends Component {
  componentDidMount() {
    this.props.setTitle();
    this.props.fetchTeam('test');
  }

  render() {
    return( <ProgressPage {...this.props} /> );
  }
}

const mapStateToProps = (globalState, props) => {
  const { members, selectedIndex, isFetching } = globalState.team;

  return {
    members,
    isFetching,
    selectedIndex,
    ...props,
  }
};

const mapDispatchToProps = (dispatch, props) => ({
  setTitle: () => dispatch(setTitle('Dashboard')),
  fetchTeam: project => dispatch(fetchTeamIfNeeded(project)),
  handleSelectMember: member => dispatch(selectMember(member, props, dispatch)),
});

const TeammemberOverview = connect(
  mapStateToProps,
  mapDispatchToProps
)(TeammemberOverviewComponent);

export default withRouter(TeammemberOverview);
