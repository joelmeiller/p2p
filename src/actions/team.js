// Middleware
import { default as getTeam } from '../middleware/getTeam.mock.js';
import { default as getTeamRating } from '../middleware/getTeamRating.mock.js';

import connect from './utils/connect.js';

// Actions
import { setTitle } from '../ui/layouts/app.jsx';
import { selectMember } from './member.js';

export const REQUEST_TEAM = '/team/REQUEST_TEAM';
export const RECEIVE_TEAM = '/team/RECEIVE_TEAM';
export const UPDATE_TEAM = '/team/UPDATE_TEAM';
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

export const fetchTeam = asQM => connect(
  REQUEST_TEAM,
  RECEIVE_TEAM,
  (asQM ? getTeamRating : getTeam),
  data => ({
    members: data.members,
  })
);

export const updateTeamMember = updatedMember => (dispatch, state) => {
  console.log(state);
  const members = state.members;

  return {
    type: UPDATE_TEAM,
    members: members.map(member =>
      (member.id === updatedMember.id ? updatedMember : member)
    ),
  };
};

