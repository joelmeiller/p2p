// React imports
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Component imports
import EditProjectPage from '../ui/pages/EditProjectPage.jsx';

// Action imports
import { setTitle } from '../actions/app.js';
import {
  save,
  cancel,
} from '../actions/projects.js';

class EditProjectComponent extends Component {
  componentDidMount() {
    this.props.initializeTitle();
    this.props.fetchProjects();
  }

  render() {
    return (<EditProjectPage {...this.props} />);
  }
}

EditProjectComponent.propTypes = {
  initializeTitle: React.PropTypes.func,
  fetchProjects: React.PropTypes.func,
};
