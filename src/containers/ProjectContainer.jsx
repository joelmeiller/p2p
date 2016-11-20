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
  setArt,
  setStatus,
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
  initializeTitle: React.PropTypes.func,
  fetchProject: React.PropTypes.func,
};

const mapStateToProps = (globalState, props) => {
  const state = globalState.project;

  return {
    ...props,
    ...state,
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  fetchProject: () => dispatch(fetchProject(props.routeParams.id)),
  handleSave: () => dispatch(saveProject(props.router)),
  handleCancel: () => dispatch(cancel(props.router)),
  handleTitleChanged: newTitleValue => dispatch(setProjectTitle(newTitleValue)),
  handleCoachChanged: newCoachValue => dispatch(setCoachName(newCoachValue)),
  handleStufeChanged: newStufeValue => dispatch(setStufe(newStufeValue)),
  handleArtChanged: newArtValue => dispatch(setArt(newArtValue)),
  handleStatushanged: newStatusValue => dispatch(setStatus(newStatusValue)),
  handleStartChanged: newStartValue => dispatch(setProjectStart(newStartValue)),
  handleStopChanged: newStartValue => dispatch(setProjectStop(newStartValue)),
});

const ProjectContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProjectComponent);

export default withRouter(ProjectContainer);
