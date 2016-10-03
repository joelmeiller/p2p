import {
  RECEIVE_INBOX,
  REQUEST_INBOX,
  PERFORM_ACTION,
} from '../actions/inbox.js';

const initialState = {
  actions: [],
  isFetching: false,
  fetched: false,
};

const reducer = (state = initialState, action) => {
  const { type, ...params } = action;

  switch (type) {
    case REQUEST_INBOX:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_INBOX:
      return {
        ...state,
        ...params,
        isFetching: false,
      };
    case PERFORM_ACTION:
      return {
        ...state,
        ...params,
        isFetching: false,
      };
    default:
      return state;
  }
};

export default reducer;
