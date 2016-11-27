// Middleware
import {
  getProject as apiGetProject,
  updateProjectStatus as apiUpdateProjectStatus,
  postProject as apiPostProject,
} from '../middleware/project.js';

import { fetchProjects } from './projectList.js'

export const REQUEST_PROJECT = '/project/REQUEST_PROJECT';
export const RECEIVE_PROJECT = '/project/RECEIVE_PROJECT';

export const SET_PROJECT_TITLE = 'project/SET_PROJECT_TITLE';
export const SET_COACH_NAME = 'project/SET_COACH_NAME';
export const SET_QM = '/project/SET_QM';
export const SET_PROJECT_STUFE = 'project/SET_PROJECT_STUFE';
export const SET_PROJECT_START = 'project/SET_PROJECT_START';
export const SET_PROJECT_STATUS = 'project/SET_PROJECT_STATUS';
export const SET_PROJECT_ZEITMODELL = 'project/SET_PROJECT_ZEITMODELL';

export const ADD_PROJECT = '/project/ADD_PROJECT';
export const CANCEL = 'project/CANCEL';


const requestData = () => ({
  type: REQUEST_PROJECT,
});

const receiveData = data => ({
  type: RECEIVE_PROJECT,
  project: data,
});

const shouldFetchData = (state) => {
  if (!state.criteria || state.reload) {
    return true;
  }
  return !state.criteria.isFetching && !state.criteria.fetched;
};

export const fetchProject = id => (dispatch, getState) => {
  if (shouldFetchData(getState())) {
    dispatch(requestData());
    apiGetProject(id).then(data => dispatch(receiveData(data)));
  }
};

const makeSaveCallback = (dispatch, router) => (arg) => {
  console.log('saveCallback', arg);
  router.push('/ip-p2p');
  dispatch(fetchProjects({ force: true }));
};

export const saveProject = router => (dispatch, getState) => {
  const project = getState().project;
  if (project.id) {
    apiUpdateProjectStatus(project).then(makeSaveCallback(dispatch, router));
  } else {
    apiPostProject(project).then(makeSaveCallback(dispatch, router));
  }
};

export const cancel = router => (dispatch) => {
  dispatch({
    type: CANCEL,
  });
  router.push('/ip-p2p');
};

export const setProjectTitle = newValue => (dispatch) => {
  dispatch({
    type: SET_PROJECT_TITLE,
    value: newValue,
  });
};

export const setCoachName = newValue => (dispatch) => {
  dispatch({
    type: SET_COACH_NAME,
    value: newValue,
  });
};

export const setQmName = student => (dispatch) => {
  dispatch({
    type: SET_QM,
    value: student.email,
  });
};

export const setStufe = newValue => (dispatch) => {
  dispatch({
    type: SET_PROJECT_STUFE,
    value: newValue,
  });
};

export const setProjectStart = newValue => (dispatch) => {
  dispatch({
    type: SET_PROJECT_START,
    value: newValue,
  });
};

export const setProjectStatus = newValue => (dispatch) => {
  dispatch({
    type: SET_PROJECT_STATUS,
    value: newValue,
  });
};

export const setZeitmodell = newValue => (dispatch) => {
  dispatch({
    type: SET_PROJECT_ZEITMODELL,
    value: newValue,
  });
};
