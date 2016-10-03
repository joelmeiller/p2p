import {
  ADD_CRITERIA,
  RECEIVE_CRITERIA,
  REMOVE_CRITERIA,
  REQUEST_CRITERIA,
  SAVE_CRITERIA,
  SET_CRITERIA,
  SET_CRITERIA_VALUE,
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
    case ADD_CRITERIA:
    case REMOVE_CRITERIA:
    case SAVE_CRITERIA:
    case SET_CRITERIA:
    case SET_CRITERIA_VALUE:
      return {
        ...state,
        ...params,
      };
    default:
      return state;
  }
};

export default reducer;
