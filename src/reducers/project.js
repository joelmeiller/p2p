// Actions
import { SET_COACH_NAME, SET_PROJECT_TITLE, SAVE, CANCEL, REQUEST_USER, RECEIVE_USER } from '../actions/project.js';


const initialState = {
  title: undefined,
  coach: undefined,
  status: 'open',
  isFetching: false,
  fetched: false,
};

const reducer = (state = initialState, action) => {
  const { type, value, ...params } = action;
  switch (type) {
    case SET_PROJECT_TITLE:
      return {
        ...state,
        ...params,
        title: value,
      };
    case SET_COACH_NAME:
      return {
        ...state,
        ...params,
        name: value,
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
