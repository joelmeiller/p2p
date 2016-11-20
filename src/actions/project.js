// Middleware
import {
  getProject as apiGetProject,
  putProject as apiPutProject,
  postProject as apiPostProject,
} from '../middleware/project.js';

import { initialState } from '../reducers/project.js'

import { fetchProjects } from './projectList.js'

// "ID" of a new object.
export const NEW_ID = '_new';

// Creates new empty project.
export const ADD_PROJECT = '/project/ADD_PROJECT';
export const CANCEL = 'project/CANCEL';
export const EDIT_PROJECT = 'project/EDIT';
export const SET_PROJECT_TITLE = 'project/SET_PROJECT_TITLE';
export const SET_COACH_NAME = 'project/SET_COACH_NAME';
export const SET_PROJECT_STUFE = 'project/SET_PROJECT_STUFE';
export const SET_PROJECT_START = 'project/SET_PROJECT_START';
export const SET_PROJECT_STOP = 'project/SET_PROJECT_STOP';
export const SET_PROJECT_ART = 'project/SET_PROJECT_ART';
export const SET_PROJECT_STATUS = 'project/SET_PROJECT_STATUS';
export const REQUEST_PROJECT = '/project/REQUEST_PROJECT';
export const RECEIVE_PROJECT = '/project/RECEIVE_PROJECT';


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
  if (id === NEW_ID) {
    dispatch(receiveData({
      ...initialState,
      start: new Date(),
      stop: new Date(),
    }));
    return;
  }
  if (shouldFetchData(getState())) {
    dispatch(requestData());
    apiGetProject(id, data => dispatch(receiveData(data)));
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
    apiPutProject(project, makeSaveCallback(dispatch, router));
  } else {
    apiPostProject(project, makeSaveCallback(dispatch, router));
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

export const setProjectStufe = newValue => (dispatch) => {
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

export const setProjectStop = newValue => (dispatch) => {
  dispatch({
    type: SET_PROJECT_STOP,
    value: newValue,
  });
};

export const setProjectArt = newValue => (dispatch) => {
  dispatch({
    type: SET_PROJECT_ART,
    value: newValue,
  });
};

export const setProjectStatus = newValue => (dispatch) => {
  dispatch({
    type: SET_PROJECT_STATUS,
    value: newValue,
  });
};
