// Middleware
import { default as apiGetProjects } from '../middleware/getProjects.mock.js';

export const ADD_PROJECT = '/projectList/ADD_PROJECT';
export const SHOW_PROJECT = '/projectList/ADD_PROJECT';
export const RECEIVE_PROJECTS = '/projectList/RECEIVE_PROJECTS';
export const REMOVE_PROJECT = '/projectList/REMOVE_PROJECT';
export const REQUEST_PROJECTS = '/projectList/REQUEST_PROJECTS';
export const SET_NEW_PROJECT_VALUE = '/projectList/SET_NEW_PROJECT_VALUE';
export const UPDATE_PROJECT = '/projectList/UPDATE_PROJECT';
export const SAVE_PROJECTS = '/projectList/SAVE_PROJECTS';

const requestData = () => ({
  type: REQUEST_PROJECTS,
});

const receiveData = data => ({
  type: RECEIVE_PROJECTS,
  projects: data.projects,
});

const shouldFetchData = (state) => {
  if (!state.project || state.relaod) {
    return true;
  }
  return !state.project.isFetching && !state.project.fetched;
};

export const fetchProject = () => (dispatch, getState) => {
  if (shouldFetchData(getState())) {
    dispatch(requestData());

    apiGetProjects((data) => {
      dispatch(receiveData(data));
    });
  }
};


export const showProject = (selectedProjectIndexes, props) => (dispatch, getState) => {
  console.log(selectedProjectIndexes);
  const state = getState().projects;

  if (selectedProjectIndexes.length === 1 && state.projects) {
    const project = state.projects[selectedProjectIndexes[0]];
    dispatch({
      type: SHOW_PROJECT,
      project,
    });
    props.router.push(`/projects/${project.slug}`);
  } else {
    console.log(`No or more then one project found. Selected projects (index): ${selectedProjectIndexes[0]})`);
  }
};

export const updateProject = (value, projectId) => (dispatch, getState) => {
  const state = getState().project;

  dispatch({
    type: UPDATE_PROJECT,
    projects: state.projects,
  });
};

export const setNewProjectValue = value => (dispatch, getState) => {
  const state = getState().project;
  const newProjctValues = state.newProjctValues || {};

  if (value.roleId) {
    newProjctValues.roleId = value.roleId;
  }
  if (value.name) {
    newProjctValues.name = value.name;
  }
  if (value.email) {
    newProjctValues.email = value.email;
  }

  dispatch({
    type: SET_NEW_PROJECT_VALUE,
    newProjctValues,
    canAdd: !(!newProjctValues.roleId || !newProjctValues.name || !newProjctValues.email),
  });
};

export const removeProjct = projectId => (dispatch, getState) => {
  const state = getState().project;

  const projects = (state.projects || []).filter(project =>
    project.id !== projectId);

  dispatch({
    type: REMOVE_PROJECT,
    projects,
  });
};


export const saveProject = props => (dispatch, getState) => {
  const state = getState().project;

  if (state.projects) {
    // apiSaveProject(state.projects, (err) => {
    //   if (err) dispatch(apiError(fetchProject));
    // });

    dispatch({
      type: SAVE_PROJECTS,
      projects: state.projects,
    });
  }

  props.router.push('/');
};

export const cancel = props => (dispatch) => {
  dispatch(requestData());

  apiGetProjects((data) => {
    dispatch(receiveData(data));
  });

  props.router.push('/');
};
