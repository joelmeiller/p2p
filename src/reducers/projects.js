import {
  ADD_PROJECT,
  ERROR_RESET_PROJECTSPROJECT,
  RECEIVE_PROJECTS,
  REMOVE_PROJECT,
  REQUEST_PROJECTS,
  SET_NEW_PROJECT_VALUE,
  UPDATE_PROJECTS,
  SAVE_PROJECTS,
} from '../actions/projects.js';

const initialState = {
  projects: [],
  newProjectValues: {},
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
      };
    case REMOVE_PROJECT:
    case SAVE_PROJECTS:
    case SET_NEW_PROJECT_VALUE:
    case UPDATE_PROJECTS:
    case ADD_PROJECT:
      return {
        ...state,
        ...params,
      };
    case ERROR_RESET_PROJECTSPROJECT:
      return {
        ...state,
        projects: state.projects.map(p => (p.id === action.project.id ? action.project : p)),
      };
    default:
      return state;
  }
};

export default reducer;
