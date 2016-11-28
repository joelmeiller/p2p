// Actions
import {
  SET_TITLE,
  SET_STATUS,
  CLOSE_PROJECT,
  REQUEST,
  RECEIVE,
  SET_IMPERSONATION,
} from '../actions/app.js';


const initialState = {
  title: 'Dashboard',
  user: undefined,
  project: undefined,
  rating: undefined,
  hasEvaluation: false,
  isFetching: false,
  fetched: false,
  impersonatedEmail: '',
  loggedIn: false,
  activeProfile: 'prod',
};

const reducer = (state = initialState, action) => {
  const { type, ...params } = action;
  switch (type) {
    case SET_IMPERSONATION:
      return {
        ...state,
        impersonatedEmail: params.value,
      };
    case SET_TITLE:
    case SET_STATUS:
    case CLOSE_PROJECT:
      return {
        ...state,
        ...params,
      };
    case REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE:
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
