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
  fetched: true,
});

const shouldFetchData = (state) => {
  if (!state.app || state.relaod) {
    return true;
  }
  return !state.app.isFetching && !state.app.fetched;
};


export const fetchUserAndProjectSettings = () => (dispatch, getState) => {
  if (shouldFetchData(getState())) {
    dispatch(requestData());

    getUserAndProjectSettings((data) => {
      dispatch(receiveData(data));
    });
  }
};
