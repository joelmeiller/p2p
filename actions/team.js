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

const receiveTeam = (project, json) => ({
  type: RECEIVE_TEAM,
  project,
  team: json.data.children.map(child => child.data),
});

const fetchTeam = project => dispatch => {
  dispatch(requestTeam(project));
  return fetch(`http://localhost:3000/p2p/api/team/${project}`)
    .then(response => response.json())
    .then(json => dispatch(receiveTeam(project, json)));
};

const shouldFetchTeam = state => {
  if (!state.team) {
    return true;
  }
  if (state.team.isFetching) {
    return false;
  }
  return state.team.didInvalidate;
};

export const fetchTeamIfNeeded = project => (dispatch, getState) => {
  if (shouldFetchTeam(getState())) {
    return dispatch(fetchTeam(project));
  }
};
