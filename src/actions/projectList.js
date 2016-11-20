// Middleware
import { default as apiGetProjects } from '../middleware/projectList/getProjectList.js';
import { EDIT_PROJECT, ADD_PROJECT } from './project.js';

export const RECEIVE_PROJECTS = '/projectList/RECEIVE_PROJECTS';
export const REMOVE_PROJECT = '/projectList/REMOVE_PROJECT';
export const REQUEST_PROJECTS = '/projectList/REQUEST_PROJECTS';
export const SAVE_PROJECT = '/projectList/SAVE_PROJECT';

const requestData = () => ({
  type: REQUEST_PROJECTS,
});

const receiveData = data => ({
  type: RECEIVE_PROJECTS,
  projects: data,
});

const shouldFetchData = (globalState) => {
  if (!globalState.projectList || globalState.relaod) {
    return true;
  }
  return !globalState.projectList.isFetching && !globalState.projectList.fetched;
};

export const fetchProject = () => (dispatch, getState) => {
  if (shouldFetchData(getState())) {
    dispatch(requestData());

    apiGetProjects((data) => {
      dispatch(receiveData(data));
    });
  }
};


export const editProject = (selectedProjectIndexes, props) => (dispatch, getState) => {
  console.log(selectedProjectIndexes);
  const state = getState().projectList;

  if (selectedProjectIndexes.length === 1 && state.projects) {
    const project = state.projects[selectedProjectIndexes[0]];
    dispatch({
      type: EDIT_PROJECT,
      project,
    });
    props.router.push(`/ip-p2p/projects/${project.id}`);
  } else {
    console.log(`No or more then one project found. Selected projects (index): ${selectedProjectIndexes[0]})`);
  }
};

export const saveProject = props => (dispatch, getStore) => {
  const updatedProject = getStore().project;
  const projectList = getStore().projectList;

  if (updatedProject.id) {
    dispatch({
      type: SAVE_PROJECT,
      projects: projectList.projects.map(project => (project.id === updatedProject.id ? {
        ...project,
        ...updatedProject,
      } : project)),
    });
  } else {
    const projects = projectList.projects.map(project => project);
    projects.push({ ...updatedProject });
    dispatch({
      type: SAVE_PROJECT,
      projects,
    });
  }
  props.router.push('/ip-p2p');
};

export const removeProject = projectId => (dispatch, getState) => {
  const state = getState().projectList;

  const projects = (state.projects || []).filter(project =>
    project.id !== projectId);

  dispatch({
    type: REMOVE_PROJECT,
    projects,
  });
};

export const addProject = props => (dispatch) => {
  dispatch({
    type: ADD_PROJECT,
  });
  props.router.push('/ip-p2p/projects/add');
};

export const cancel = props => (dispatch) => {
  dispatch(requestData());

  apiGetProjects((data) => {
    dispatch(receiveData(data));
  });

  props.router.push('/ip-p2p');
};
