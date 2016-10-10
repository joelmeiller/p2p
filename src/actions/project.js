import getUserAndProjectSettings from '../middleware/getUserAndProjectSettings.mock.js';


export const CANCEL = 'project/CANCEL';
export const SAVE = 'project/SAVE';
export const SET_PROJECT_TITLE = 'project/SET_PROJECT_TITLE';
export const SET_COACH_NAME = 'project/SET_COACH_NAME';
export const REQUEST_USER = 'app/REQUEST_USER_AND_PROJECT';
export const RECEIVE_USER = 'app/RECEIVE_USER_AND_PROJECT';

export const cancel = props => (dispatch) => {
  dispatch({
    type: CANCEL,
  });
  props.router.push('/');
};

export const save = props => (dispatch, getState) => {
  const state = getState().project;

  dispatch({
    type: SAVE,
    title: state.title,
    name: state.name,
  });
  props.router.push('/');
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

const requestData = () => ({
  type: REQUEST_USER,
});

const receiveData = data => ({
  type: RECEIVE_USER,
  project: data.project,
  user: data.user,
});

const shouldFetchData = (state) => {
  if (!state.app || state.relaod) {
    return true;
  }
  return !state.app.isFetching && !state.app.fetched;
};

export const fetchProject = () => (dispatch, getState) => {
  if (shouldFetchData(getState())) {
    dispatch(requestData());

    getUserAndProjectSettings((data) => {
      dispatch(receiveData(data));
    });
  }
};
