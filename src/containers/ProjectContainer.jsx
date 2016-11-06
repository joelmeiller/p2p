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
});

const ProjectContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProjectComponent);

export default withRouter(ProjectContainer);
