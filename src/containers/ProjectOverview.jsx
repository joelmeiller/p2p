// Node imports
import moment from 'moment';

// React imports
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

// Component imports
import ProjectPage from '../ui/pages/ProjectPage.jsx';

// Action imports
import { fetchProject, editProject } from '../actions/projectList.js';


class ProjectOverviewComponent extends Component {
  componentDidMount() {
    this.props.fetchProject();
  }

  render() {
    return <ProjectPage {...this.props} />;
  }
}

ProjectOverviewComponent.propTypes = {
  fetchProject: React.PropTypes.func,
};

const mapStateToProps = (globalState, props) => {
  const { projects, readonly } = globalState.projectList;

  const updatedProjects = projects.map(project => ({
    ...project,
    lastUpdate: moment(project.lastUpdateTSD).format('L'),
  }));

  return {
    ...props,
    readonly,
    projects: updatedProjects,
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  fetchProject: () => dispatch(fetchProject()),
  handleSelectProject: selectedProjects => dispatch(editProject(selectedProjects, props)),
});

const ProjectOverview = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectOverviewComponent);


export default withRouter(ProjectOverview);
