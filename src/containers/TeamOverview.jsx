// React imports
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

// Component imports
import EditTeamPage from '../ui/pages/EditTeamPage.jsx';

// Action imports
import { setTitle } from '../actions/app.js';
import {
  addMember,
  deleteMember,
  fetchTeam,
  saveTeam,
  setMemberValue,
  cancel,
} from '../actions/team.js';


class TeamOverviewComponent extends Component {
  componentDidMount() {
    this.props.initializeTitle();
    this.props.fetchTeam();
  }

  render() {
    return (<EditTeamPage {...this.props} />);
  }
}

TeamOverviewComponent.propTypes = {
  initializeTitle: React.PropTypes.func,
  fetchTeam: React.PropTypes.func,
};

const mapStateToProps = (globalState, props) => {
  const { members, roles, readonly, ...other } = globalState.team;

  console.log(roles);

  return {
    ...props,
    ...other,
    title: 'Teammembers',
    members,
    roles,
    readonly,
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  initializeTitle: () => dispatch(setTitle('Teammembers')),
  fetchTeam: () => dispatch(fetchTeam()),
  handleDelete: member => dispatch(deleteMember(member)),
  handleAdd: () => dispatch(addMember()),
  handleValueChanged: (value, memberId) => dispatch(setMemberValue(value, memberId)),
  handleSave: () => dispatch(saveTeam(props)),
  handleCancel: () => dispatch(cancel(props)),
});

const TeamOverview = connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamOverviewComponent);

export default withRouter(TeamOverview);
