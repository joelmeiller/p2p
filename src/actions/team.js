
import { getTeam } from '../middleware/getTeam.mock.js';


export const REQUEST_TEAM = 'REQUEST_TEAM';
export const RECEIVE_TEAM = 'RECEIVE_TEAM';
export const SELECT_PROJECT = 'SELECT_PROJECT';
export const INVALIDATE_PROJECT = 'INVALIDATE_PROJECT';

export const selectProject = (project) => ({
  type: SELECT_PROJECT,
  project,
});

export const invalidateProject = (project) => ({
  type: INVALIDATE_PROJECT,
  project,
});

const requestTeam = project => ({
  type: REQUEST_TEAM,
  project,
});

const receiveTeam = (project, data) => ({
  type: RECEIVE_TEAM,
  project,
  members: data.members,
});

const fetchTeam = project => dispatch => {
  dispatch(requestTeam(project));
  getTeam(project, (data) => {
    dispatch(receiveTeam(project, data));
  });
};

const shouldFetchTeam = state => {
  if (!state.team) {
    return true;
  }
  return !state.team.isFetching;
};

export const fetchTeamIfNeeded = project => (dispatch, state) => {
  if (shouldFetchTeam(state)) {
    return dispatch(fetchTeam(project));
  }
};
