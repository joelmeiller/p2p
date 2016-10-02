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
  setNewMemberValue,
  updateRoleOfMember,
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
  const { members, addedMember, newMemberValues, canAdd, ...otherStates } = globalState.team;

  if (addedMember) {
    members.push(addedMember);
  }

  return {
    ...props,
    ...otherStates,
    title: 'Teammembers',
    members,
    newMemberRoleId: newMemberValues.roleId,
    canAdd,
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  initializeTitle: () => dispatch(setTitle('Teammembers')),
  fetchTeam: () => dispatch(fetchTeam()),
  handleDelete: member => dispatch(deleteMember(member)),
  handleAdd: student => dispatch(addMember(student)),
  handleRoleChanged: (role, memberId) => dispatch(updateRoleOfMember(role, memberId)),
  handleValueChanged: value => dispatch(setNewMemberValue(value)),
  handleSave: () => dispatch(saveTeam(props)),
  handleCancel: () => dispatch(cancel(props)),
});

const TeamOverview = connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamOverviewComponent);

export default withRouter(TeamOverview);
