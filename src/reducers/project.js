// Actions
import {
  REQUEST_PROJECT,
  RECEIVE_PROJECT,

  ADD_PROJECT,

  SET_PROJECT_TITLE,
  SET_COACH_NAME,
  SET_QM,
  SET_PROJECT_STUFE,
  SET_PROJECT_ZEITMODELL,
  SET_PROJECT_START,
  SET_PROJECT_STATUS,
} from '../actions/project.js';


export const initialState = {
  isFetching: false,
  fetched: false,

  title: undefined,
  coach: undefined,
  qmName: undefined,
  level: undefined,
  zeitmodell: undefined,
  start: undefined,
  stop: null,
};

const reducer = (state = { ...initialState }, action) => {
  const { type, value, ...params } = action;
  switch (type) {
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

    case ADD_PROJECT:
      return {
        ...initialState,
      };

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
        coach: value,
      };
    case SET_QM:
      return {
        ...state,
        qmName: value,
      };
    case SET_PROJECT_STUFE:
      return {
        ...state,
        ...params,
        level: value,
      };
    case SET_PROJECT_ZEITMODELL:
      return {
        ...state,
        ...params,
        zeitmodell: value,
      };
    case SET_PROJECT_START:
      return {
        ...state,
        ...params,
        start: value,
      };
    case SET_PROJECT_STATUS:
      return {
        ...state,
        ...params,
        status: value,
      };

    default:
      return state;
  }
};

export default reducer;
