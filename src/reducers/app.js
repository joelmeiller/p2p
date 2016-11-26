// Actions
import {
  SET_TITLE,
  SET_STATUS,
  CLOSE_PROJECT,
  REQUEST_USER,
  RECEIVE_USER
} from '../actions/app.js';


const initialState = {
  title: 'Dashboard',
  user: undefined,
  project: undefined,
  rating: undefined,
  hasEvaluation: false,
  isFetching: false,
  fetched: false,
};

const reducer = (state = initialState, action) => {
  const { type, ...params } = action;
  switch (type) {
    case SET_TITLE:
    case SET_STATUS:
    case CLOSE_PROJECT:
      return {
        ...state,
        ...params,
      };
    case REQUEST_USER:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_USER:
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
