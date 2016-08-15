import { combineReducers } from 'redux';
import {
  INVALIDATE_PROJECT,
  RECEIVE_TEAM,
  REQUEST_TEAM,
  SELECT_PROJECT,
} from '../actions/team.js';

const initialState = {
  isFetching: false,
  didInvalidate: false,
};

const selectedProject = (state, action) => {
  switch (action.type) {
    case SELECT_PROJECT:
      return action.project;
    default:
      return state;
  }
};

const getTeam = (state = initialState, action) => {
  switch (action.type) {
    case INVALIDATE_PROJECT:
      return Object.assign({}, state, {
        didInvalidate: true,
      });
    case REQUEST_TEAM:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
      });
    case RECEIVE_TEAM:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.team,
        lastUpdated: action.receivedAt,
      });
    default:
      return state;
  }
};

const teamByProject = (state = {}, action) => {
  switch (action.type) {
    case INVALIDATE_PROJECT:
    case RECEIVE_TEAM:
    case REQUEST_TEAM:
      return Object.assign({}, state, {
        [action.project]: getTeam(state[action.project], action),
      });
    default:
      return state;
  }
};

const teamReducer = combineReducers({
  teamByProject,
  selectedProject,
});

export default teamReducer;
