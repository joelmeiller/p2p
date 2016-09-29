// Middleware
import { default as apiGetInbox } from '../middleware/getInbox.mock.js';
// import { default as getTeamRating } from '../middleware/getTeamRating.mock.js';

// Actions
export const REQUEST_INBOX = '/inbox/REQUEST_INBOX';
export const RECEIVE_INBOX = '/inbox/RECEIVE_INBOX';
export const PERFORM_ACTION = '/inbox/PERFORM_ACTION';


export const performAction = action => ({
  type: PERFORM_ACTION,
  action,
});

const requestData = () => ({
  type: REQUEST_INBOX,
});

const receiveData = data => ({
  type: RECEIVE_INBOX,
  ...data,
});

const shouldFetchData = (state) => {
  if (!state.inbox || state.relaod) {
    return true;
  }
  return !state.inbox.isFetching && !state.inbox.fetched;
};

export const fetchInbox = () => (dispatch, getState) => {
  if (shouldFetchData(getState())) {
    dispatch(requestData());

    apiGetInbox((data) => {
      dispatch(receiveData(data));
    });
  }
};

