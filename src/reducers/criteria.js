import {
  RECEIVE_CRITERIA,
  REQUEST_CRITERIA,
  DELETE_CRITERIA,
} from '../actions/criteria.js';

const initialState = {
  members: [],
  isFetching: false,
  fetched: false,
};

const reducer = (state = initialState, action) => {
  const { type, ...params } = action;
  switch (type) {
    case REQUEST_CRITERIA:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_CRITERIA:
      return {
        ...state,
        ...params,
        isFetching: false,
      };
    case DELETE_CRITERIA:
      return {
        ...state,
        ...params,
      };
    default:
      return state;
  }
};

export default reducer;
