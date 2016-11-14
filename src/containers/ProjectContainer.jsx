// React imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Component imports
import EditProjectPage from '../ui/pages/EditProjectPage.jsx';

// Action imports
import { setTitle } from '../actions/app.js';
import {
  cancel,
  setProjectTitle,
  setCoachName,
  setStufe,
  setStart,
  setArt,
  setStatus,
} from '../actions/project.js';

import { saveProject } from '../actions/projectList.js';

class EditProjectComponent extends Component {
  componentDidMount() {
    this.props.initializeTitle();
  }

  render() {
    return (<EditProjectPage {...this.props} />);
  }
}

EditProjectComponent.propTypes = {
  initializeTitle: React.PropTypes.func,
};

const mapStateToProps = (globalState, props) => {
  const state = globalState.project;

  return {
    ...props,
    ...state,
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  initializeTitle: () => dispatch(setTitle('Edit Project')),
  handleSave: () => dispatch(saveProject(props)),
  handleCancel: () => dispatch(cancel(props)),
  handleTitleChanged: newTitleValue => dispatch(setProjectTitle(newTitleValue)),
  handleCoachChanged: newCoachValue => dispatch(setCoachName(newCoachValue)),
  handleStufeChanged: newStufeValue => dispatch(setStufe(newStufeValue)),
  handleStartChanged: newStartValue => dispatch(setStart(newStartValue)),
  handleArtChanged: newArtValue => dispatch(setArt(newArtValue)),
  handleStatushanged: newStatusValue => dispatch(setStatus(newStatusValue)),
});

const ProjectContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProjectComponent);

export default withRouter(ProjectContainer);
