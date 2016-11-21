// Node imports
import moment from 'moment';

// React imports
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

// Component imports
import ProjectPage from '../ui/pages/ProjectPage.jsx';

// Action imports
import { fetchProjects, editProject, addProject } from '../actions/projectList.js';


class ProjectOverviewComponent extends Component {
  componentDidMount() {
    this.props.fetchProjects();
  }

  render() {
    return <ProjectPage {...this.props} />;
  }
}

ProjectOverviewComponent.propTypes = {
  fetchProjects: React.PropTypes.func,
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
  fetchProjects: () => dispatch(fetchProjects()),
  handleSelectProject: selectedProject => dispatch(editProject(selectedProject, props)),
  handleAddProject: () => dispatch(addProject(props)),
});

const ProjectOverview = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectOverviewComponent);


export default withRouter(ProjectOverview);
