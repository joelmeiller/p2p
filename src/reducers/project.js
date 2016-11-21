// Actions
import {
  ADD_PROJECT,
  EDIT_PROJECT,
  SET_PROJECT_TITLE,
  SET_COACH_NAME,
  SET_PROJECT_STUFE,
  SET_PROJECT_START,
  SET_PROJECT_STOP,
  SET_PROJECT_ZEITMODELL,
  SET_PROJECT_STATUS,
  REQUEST_PROJECT,
  RECEIVE_PROJECT,
} from '../actions/project.js';


export const initialState = {
  title: undefined,
  coach: undefined,
  members: [],
  stufe: undefined,
  start: undefined,
  stop: undefined,
  zeitmodell: undefined,
  status: undefined,
  // Indicate server fetching status.
  isFetching: false,
  fetched: false,
};

const reducer = (state = { ...initialState }, action) => {
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
    case SET_PROJECT_STUFE:
      return {
        ...state,
        ...params,
        stufe: value,
      };
    case SET_PROJECT_START:
      return {
        ...state,
        ...params,
        start: value,
      };
    case SET_PROJECT_STOP:
      return {
        ...state,
        ...params,
        stop: value,
      };
    case SET_PROJECT_ZEITMODELL:
      return {
        ...state,
        ...params,
        zeitmodell: value,
      };
    case SET_PROJECT_STATUS:
      return {
        ...state,
        ...params,
        status: value,
      };
    case EDIT_PROJECT:
      return {
        ...state,
        ...params.project,
      };
    case ADD_PROJECT:
      return {
        ...initialState,
      };
    case REQUEST_PROJECT:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_PROJECT:
      return {
        ...state,
        ...params.project,
        isFetching: false,
        fetched: true,
      };
    default:
      return state;
  }
};

export default reducer;
