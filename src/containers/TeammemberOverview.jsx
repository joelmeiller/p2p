// React imports
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

// Component imports
import ProgressPage from '../ui/pages/ProgressPage.jsx';

// Action imports
import { fetchTeamIfNeeded, showMemberEvaluation } from '../actions/team.js';
import { setTitle } from '../ui/layouts/app.jsx';


class TeammemberOverviewComponent extends Component {
  componentDidMount() {
    this.props.setTitle();
    this.props.fetchTeam('test');
  }

  render() {
    return (<ProgressPage {...this.props} />);
  }
}

TeammemberOverviewComponent.propTypes = {
  setTitle: React.PropTypes.func,
  fetchTeam: React.PropTypes.func,
};

const mapStateToProps = (globalState, props) => {
  const { members, isFetching } = globalState.team;

  return {
    members,
    isFetching,
    ...props,
  };
};

const mapDispatchToProps = dispatch => ({
  setTitle: () => dispatch(setTitle('Dashboard')),
  fetchTeam: project => dispatch(fetchTeamIfNeeded(project)),
  handleSelectMember: (member, props) => dispatch(showMemberEvaluation(member, props)),
});

const TeammemberOverview = connect(
  mapStateToProps,
  mapDispatchToProps
)(TeammemberOverviewComponent);

export default withRouter(TeammemberOverview);
