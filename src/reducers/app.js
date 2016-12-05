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
  activeProfile: 'prod',
  fetched: false,
  hasEvaluation: false,
  impersonatedEmail: '',
  isFetching: false,
  loggedIn: false,
  project: undefined,
  rating: undefined,
  title: 'Dashboard',
  user: undefined,
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
