import getUserAndProjectSettings from '../middleware/getUserAndProjectSettings.mock.js';

export const SET_TITLE = 'app/SET_TITLE';
export const REQUEST_USER = 'app/REQUEST_USER_AND_PROJECT';
export const RECEIVE_USER = 'app/RECEIVE_USER_AND_PROJECT';

export const setTitle = title => ({
  type: SET_TITLE,
  title,
});

const requestData = () => ({
  type: REQUEST_USER,
});

const receiveData = data => ({
  type: RECEIVE_USER,
  project: data.project,
  user: data.user,
});

const fetchData = () => (dispatch) => {
  dispatch(requestData());
  getUserAndProjectSettings((data) => {
    dispatch(receiveData(data));
  });
};

const shouldFetchData = (state) => {
  if (!state.app) {
    return true;
  }
  return !state.app.isFetching;
};

export const fetchUserAndProjectSettings = () => (dispatch, state) => {
  if (shouldFetchData(state)) {
    dispatch(fetchData());
  }
};
