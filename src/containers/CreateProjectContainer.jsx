// React imports
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Component imports
import CreateProjectPage from '../ui/pages/CreateProjectPage.jsx';

// Action imports
// import { setTitle } from '../actions/app.js';
import {
  fetchProject,

  setProjectTitle,
  setCoachName,
  setQmName,
  setStufe,
  setProjectStart,
  setZeitmodell,

  saveProject,
  cancel,
} from '../actions/project.js';

const mapStateToProps = (globalState, props) => {
  const project = globalState.project;

  return {
    ...props,
    ...project,
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  fetchProject: () => dispatch(fetchProject(props.routeParams.id)),

  handleTitleChanged: newTitleValue => dispatch(setProjectTitle(newTitleValue)),
  handleCoachChanged: newCoachValue => dispatch(setCoachName(newCoachValue)),
  handleQmNameChanged: student => dispatch(setQmName(student)),
  handleLevelChanged: newStufeValue => dispatch(setStufe(newStufeValue)),
  handleZeitmodellChanged: newZeitmodellValue => dispatch(setZeitmodell(newZeitmodellValue)),
  handleStartChanged: newStartValue => dispatch(setProjectStart(newStartValue)),

  handleSave: () => dispatch(saveProject(props.router)),
  handleCancel: () => dispatch(cancel(props.router)),
});

const CreateProjectContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateProjectPage);

export default withRouter(CreateProjectContainer);
