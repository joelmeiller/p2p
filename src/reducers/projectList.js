import {
  ADD_PROJECT,
  RECEIVE_PROJECTS,
  REMOVE_PROJECT,
  REQUEST_PROJECTS,
  SAVE_PROJECT,
} from '../actions/projectList.js';

const initialState = {
  projects: [],
  canAdd: false,
  isFetching: false,
  fetched: false,
};

const reducer = (state = initialState, action) => {
  const { type, ...params } = action;

  switch (type) {
    case REQUEST_PROJECTS:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_PROJECTS:
      return {
        ...state,
        ...params,
        isFetching: false,
        fetched: true,
      };
    case REMOVE_PROJECT:
    case ADD_PROJECT:
    case SAVE_PROJECT:
      return {
        ...state,
        ...params,
      };
    default:
      return state;
  }
};

export default reducer;
