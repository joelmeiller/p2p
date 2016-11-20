// Actions
import {
  ADD_PROJECT,
  CANCEL,
  SAVE,
  EDIT_PROJECT,
  SET_PROJECT_TITLE,
  SET_COACH_NAME,
  SET_PROJECT_STUFE,
  SET_PROJECT_START,
  SET_PROJECT_ART,
  SET_PROJECT_STATUS,
  REQUEST_PROJECT,
  RECEIVE_PROJECT,
} from '../actions/project.js';


const initialState = {
  title: undefined,
  coach: undefined,
  stufe: undefined,
  start: undefined,
  art: undefined,
  status: undefined,
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
    case SET_PROJECT_ART:
      return {
        ...state,
        ...params,
        art: value,
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
        ...state,
      };
    case RECEIVE_PROJECT:
      return {
        ...state,
        ...params.project,
      }
    default:
      return state;
  }
};

export default reducer;
