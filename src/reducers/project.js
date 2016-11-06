// Actions
import { SET_COACH_NAME, SET_PROJECT_TITLE, SAVE, CANCEL, EDIT_PROJECT } from '../actions/project.js';


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
    case EDIT_PROJECT:
      return {
        ...state,
        ...params.project,
      };
    default:
      return state;
  }
};

export default reducer;
