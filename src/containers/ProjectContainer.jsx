// React imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Component imports
import EditProjectPage from '../ui/pages/EditProjectPage.jsx';

// Action imports
// import { setTitle } from '../actions/app.js';
import {
  fetchProject,
  saveProject,
  cancel,
  setProjectTitle,
  setCoachName,
  setStufe,
  setProjectStart,
  setProjectStop,
  setZeitmodell,
  setStatus,
  addQM,
} from '../actions/project.js';

class EditProjectComponent extends Component {
  componentDidMount() {
    this.props.fetchProject();
  }

  render() {
    return (<EditProjectPage {...this.props} />);
  }
}

EditProjectComponent.propTypes = {
  fetchProject: React.PropTypes.func,
};

const mapStateToProps = (globalState, props) => {
  const project = globalState.project;
// because there should be just one member in the array.
  const qm = project.members.length === 1 ? project.members[0].student : undefined;
  console.log(project, qm);
  return {
    ...props,
    ...project,
    qmName: qm ? `${qm.firstName} ${qm.lastName} ${qm.email}` : undefined,
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  fetchProject: () => dispatch(fetchProject(props.routeParams.id)),
  handleSave: () => dispatch(saveProject(props.router)),
  handleCancel: () => dispatch(cancel(props.router)),
  handleTitleChanged: newTitleValue => dispatch(setProjectTitle(newTitleValue)),
  handleCoachChanged: newCoachValue => dispatch(setCoachName(newCoachValue)),
  handleAddQM: student => dispatch(addQM(student)),
  handleStufeChanged: newStufeValue => dispatch(setStufe(newStufeValue)),
  handleZeitmodellChanged: newZeitmodellValue => dispatch(setZeitmodell(newZeitmodellValue)),
  handleStatushanged: newStatusValue => dispatch(setStatus(newStatusValue)),
  handleStartChanged: newStartValue => dispatch(setProjectStart(newStartValue)),
  handleStopChanged: newStartValue => dispatch(setProjectStop(newStartValue)),
});

const ProjectContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProjectComponent);

export default withRouter(ProjectContainer);
