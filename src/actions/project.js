// Middleware
import { default as apiGetProjects } from '../middleware/projectList/getProjectList.js';

export const ADD_PROJECT = '/project/ADD_PROJECT';
export const CANCEL = 'project/CANCEL';
export const EDIT_PROJECT = 'project/EDIT';
export const SET_PROJECT_TITLE = 'project/SET_PROJECT_TITLE';
export const SET_COACH_NAME = 'project/SET_COACH_NAME';
export const SET_PROJECT_STUFE = 'project/SET_PROJECT_STUFE';
export const SET_PROJECT_START = 'project/SET_PROJECT_START';
export const SET_PROJECT_ART = 'project/SET_PROJECT_ART';
export const SET_PROJECT_STATUS = 'project/SET_PROJECT_STATUS';
export const REQUEST_PROJECTS = '/projects/REQUEST_PROJECTS';
export const RECEIVE_PROJECTS = '/projects/RECEIVE_PROJECTS';


const requestData = () => ({
  type: REQUEST_PROJECTS,
});

const receiveData = data => ({
  type: RECEIVE_PROJECTS,
  projects: data,
});

const shouldFetchData = (state) => {
  if (!state.criteria || state.relaod) {
    return true;
  }
  return !state.criteria.isFetching && !state.criteria.fetched;
};


export const fetchProjects = () => (dispatch, getState) => {
  if (shouldFetchData(getState())) {
    dispatch(requestData());
    apiGetProjects(data => dispatch(receiveData(data)));
  }
};

export const cancel = props => (dispatch) => {
  dispatch({
    type: CANCEL,
  });
  props.router.push('/ip-p2p');
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
