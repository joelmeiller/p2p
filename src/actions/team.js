// Middleware
import { default as getTeam } from '../middleware/getTeam.mock.js';
// import { default as getTeamRating } from '../middleware/getTeamRating.mock.js';

// Actions
import { setTitle } from './app.js';
import { selectMember } from './member.js';


export const REQUEST_TEAM = '/team/REQUEST_TEAM';
export const RECEIVE_TEAM = '/team/RECEIVE_TEAM';
export const UPDATE_TEAM = '/team/UPDATE_TEAM';
export const SET_NEW_MEMBER_VALUE = '/team/SET_NEW_MEMBER_VALUE';
export const INVALIDATE_PROJECT = '/team/INVALIDATE_PROJECT';
export const ERROR_RESET_TEAMMEMBER = '/team/ERROR_RESET_TEAMMEMBER';
export const ADD_MEMBER = '/team/ADD_MEMBER';


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

export const updateRoleOfMember = (value, updateMemberId) => (dispatch, getState) => {
  const state = getState().team;
  if (updateMemberId && value.roleId) {
    let members = [];
    if (state.members) {
      const updatedMember = state.members.find(member => member.id === updateMemberId);
      const updatedRoles = updatedMember.roles.map(role => ({
        ...role,
        active: false,
      }));
      updatedRoles.push({
        ...state.roles.find(role => role.id === value.roleId),
        active: true,
      });
      updatedMember.roles = updatedRoles;

      members = state.members.map(member =>
        (member.id === updateMemberId ? updatedMember : member));
    }

    dispatch({
      type: UPDATE_TEAM,
      members,
    });
  }
};

export const setNewMemberValue = value => (dispatch, getState) => {
  const state = getState().team;
  const newMemberValues = state.newMemberValues || {};

  if (value.roleId) {
    newMemberValues.roleId = value.roleId;
  }
  if (value.name) {
    newMemberValues.name = value.name;
  }
  if (value.email) {
    newMemberValues.email = value.email;
  }

  dispatch({
    type: SET_NEW_MEMBER_VALUE,
    newMemberValues,
    canAdd: !(!newMemberValues.roleId || !newMemberValues.name || !newMemberValues.email),
  });
};

export const addMember = student => ({
  type: ADD_MEMBER,
  member: {
    ...student,
    roles: [],
  },
});


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

