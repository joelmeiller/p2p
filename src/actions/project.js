import getUserAndProjectSettings from '../middleware/getUserAndProjectSettings.mock.js';


export const CANCEL = 'project/CANCEL';
export const REQUEST_USER = 'app/REQUEST_USER_AND_PROJECT';
export const RECEIVE_USER = 'app/RECEIVE_USER_AND_PROJECT';

export const cancel = props => (dispatch) => {
  dispatch({
    type: CANCEL,
  });
  props.router.push('/');
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
