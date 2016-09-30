// Middleware
import { default as getTeam } from '../middleware/getTeam.mock.js';
// import { default as getTeamRating } from '../middleware/getTeamRating.mock.js';

// Actions
import { setTitle } from './app.js';
import { selectMember } from './member.js';


export const REQUEST_TEAM = '/team/REQUEST_TEAM';
export const RECEIVE_TEAM = '/team/RECEIVE_TEAM';
export const UPDATE_TEAM = '/team/UPDATE_TEAM';
export const SET_MEMBER_VALUE = '/team/SET_MEMBER_VALUE';
export const INVALIDATE_PROJECT = '/team/INVALIDATE_PROJECT';
export const ERROR_RESET_TEAMMEMBER = '/team/ERROR_RESET_TEAMMEMBER';


export const resetMember = member => ({
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


export const updateTeamMember = updateMember => (dispatch, getState) => {
  const state = getState();
  const members = (state.team ? state.team.members : [])
    .map(member =>
      (member.id === updateMember.id ? updateMember : member));

  dispatch({
    type: UPDATE_TEAM,
    members,
  });
};


export const setMemberValue = (value, updateMemberId) => (dispatch, getState) => {
  if (updateMemberId && value.role) {
    const state = getState();
    console.log(state.team ? state.team.members : [])
      .map(member =>
        (member.id === updateMemberId ? ({
          ...member,
          roles: { ...member.roles.push(value.role) },
        }) : undefined));

    const members = (state.team ? state.team.members : [])
      .map(member =>
        (member.id === updateMemberId ? ({
          ...member,
          roles: { ...member.roles.push(value.role) },
        }) : member));

    dispatch({
      type: UPDATE_TEAM,
      members,
    });
  } else {
    dispatch({
      type: SET_MEMBER_VALUE,
      setMember: {
        id: updateMemberId,
        ...value,
      },
    });
  }
};

const requestData = () => ({
  type: REQUEST_TEAM,
});

const receiveData = data => ({
  type: RECEIVE_TEAM,
  members: data.members,
  roles: data.roles,
});

const shouldFetchData = (state) => {
  if (!state.team || state.relaod) {
    return true;
  }
  return !state.team.isFetching && !state.team.fetched;
};

export const fetchTeam = () => (dispatch, getState) => {
  if (shouldFetchData(getState())) {
    dispatch(requestData());

    getTeam((data) => {
      dispatch(receiveData(data));
    });
  }
};

