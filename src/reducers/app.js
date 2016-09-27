// Actions
import { SET_TITLE, REQUEST_USER, RECEIVE_USER } from '../actions/app.js';


const initialState = {
  title: 'Dashboard',
  user: {},
  project: {},
  isFetching: false,
  fetched: false,
};

const reducer = (state = initialState, action) => {
  const { type, ...params } = action;
  switch (type) {
    case SET_TITLE:
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
