// React imports
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

// Component imports
import ShowProjectPage from '../ui/pages/ShowProjectPage.jsx';

// Action imports
import { fetchProject, setProjectStop, saveProject, cancel } from '../actions/project.js';

class ShowProjectComponent extends Component {
  componentDidMount() {
    this.props.fetchProject();
  }

  render() {
    return (<ShowProjectPage {...this.props} />);
  }
}

ShowProjectComponent.propTypes = {
  fetchProject: React.PropTypes.func,
};


const mapStateToProps = (globalState, props) => {
  const project = globalState.project;

  return {
    ...props,
    ...project,
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  fetchProject: () => dispatch(fetchProject(props.routeParams.id)),

  handleStopChanged: newStartValue => dispatch(setProjectStop(newStartValue)),

  handleSave: () => dispatch(saveProject(props.router)),
  handleCancel: () => dispatch(cancel(props.router)),
});

const ShowProjectContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowProjectComponent);


export default withRouter(ShowProjectContainer);
