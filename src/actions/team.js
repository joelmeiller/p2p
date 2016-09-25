// Middleware
import { default as getTeam } from '../middleware/getTeam.mock.js';
import { default as getTeamRating } from '../middleware/getTeamRating.mock.js';

// Actions
import { setTitle } from '../ui/layouts/app.jsx';
import { selectMember } from './member.js';

export const REQUEST_TEAM = '/team/REQUEST_TEAM';
export const RECEIVE_TEAM = '/team/RECEIVE_TEAM';
export const INVALIDATE_PROJECT = '/team/INVALIDATE_PROJECT';
export const ERROR_RESET_TEAMMEMBER = '/team/ERROR_RESET_TEAMMEMBER';

export const resetTeamMember = member => ({
  type: ERROR_RESET_TEAMMEMBER,
  member,
});

export const showMemberEvaluation = (member, props) => (dispatch) => {
  if (member.categories) {
    dispatch(setTitle('Evaluation'));
    dispatch(selectMember(props.members.indexOf(member), props));
  } else {
    console.log('No Criterias defined');
  }
};


const requestData = asQM => ({
  type: REQUEST_TEAM,
  asQM,
});

const receiveData = (asQM, data) => ({
  type: RECEIVE_TEAM,
  members: data.members,
  asQM,
});

const fetchData = asQM => (dispatch) => {
  dispatch(requestData(asQM));

  const getDataMiddleware = asQM ? getTeamRating : getTeam;
  getDataMiddleware((data) => {
    dispatch(receiveData(asQM, data));
  });
};

const shouldFetchData = (state) => {
  if (!state.team) {
    return true;
  }
  return !state.team.isFetching;
};

export const fetchTeam = asQM => (dispatch, state) => {
  if (shouldFetchData(asQM, state)) {
    dispatch(fetchData(asQM));
  }
};
