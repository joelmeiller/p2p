// Middleware
import { default as apiGetTeam } from '../middleware/team/getTeam.js';
import { default as apiGetRatings } from '../middleware/ratings/getRatings.js';
import { default as apiSaveTeam } from '../middleware/team/saveTeam.js';

// Actions
import { setTitle } from './app.js';
import { selectMember } from './member.js';


export const ADD_MEMBER = '/team/ADD_MEMBER';
export const RECEIVE_TEAM = '/team/RECEIVE_TEAM';
export const RECEIVE_RATINGS = '/team/RECEIVE_RATINGS';
export const REMOVE_MEMBER = '/team/REMOVE_MEMBER';
export const REQUEST_TEAM = '/team/REQUEST_TEAM';
export const REQUEST_RATINGS = '/team/REQUEST_RATINGS';
export const UPDATE_TEAM = '/team/UPDATE_TEAM';
export const SAVE_TEAM = '/team/SAVE_TEAM';


const receiveData = (type, data) => ({
  type,
  members: data,
});

const shouldFetchData = (state) => {
  if (!state.team || state.relaod) {
    return true;
  }
  return !state.team.isFetching && !state.team.fetched;
};

export const fetchTeam = (props) => (dispatch, getState) => {
  if (shouldFetchData(getState())) {

    if (props.isQM) {
      dispatch({ type: REQUEST_TEAM });
      apiGetTeam(data => dispatch(receiveData(RECEIVE_TEAM, data)));
    } else {
      dispatch({ type: REQUEST_RATINGS });
      apiGetRatings(data => dispatch(receiveData(RECEIVE_RATINGS, data)));
    }
  }
};


export const showMemberEvaluation = (member, props) => (dispatch) => {
  if (member.categories) {
    dispatch(setTitle('Evaluation'));
    dispatch(selectMember(props.members.indexOf(member), props));
  } else {
    console.log('No Criterias defined');
  }
};

export const updateRoleOfMember = (value, updateMember) => (dispatch, getState) => {
  const state = getState().team;
  const roleState = getState().role;

  if (updateMember && value.roleId) {

    const updatedMember = state.members.find(member => member.studentId === updateMember.studentId);
    const updatedRoles = updatedMember.roles.map(role => ({
      ...role,
      active: false,
    }));
    updatedRoles.push({
      ...roleState.roles.find(role => role.roleId === value.roleId),
      active: true,
    });
    updatedMember.roles = updatedRoles;

    dispatch({
      type: UPDATE_TEAM,
      members: state.members.map(member =>
        (member.studentId === updateMember.studentId ? {
          ...updatedMember,
          updated: true,
        } : member)),
    });
  }
};

export const addMember = (student) => (dispatch, getState) => {
  const state = getState().team;

  const members = state.members;

  if (members) {
    members.push({
      studentId: student.id,
      name: student.name,
      email: student.email,
      slug: student.slug,
      roles: [],
      added: true,
    });

    dispatch({
      type: ADD_MEMBER,
      members,
    })
  }
};

export const removeMember = removedMember => (dispatch, getState) => {
  const state = getState().team;

  const members = (state.members || [])
    .map(member => ({
      ...member,
      removed: member.removed || member.studentId === removedMember.studentId,
    }));

  dispatch({
    type: REMOVE_MEMBER,
    members,
  });
};

export const updateMember = updatedMember => (dispatch, getState) => {
  const state = getState();
  const members = state.team.members.map(member =>
      (member.id === updatedMember.id ? updatedMember : member));

  dispatch({
    type: UPDATE_TEAM,
    members,
  });
};


export const saveTeam = props => (dispatch, getState) => {
  const state = getState().team;

  if (state.members) {
    apiSaveTeam(state.members, (data) => {
      if (data.status === 500) {
        alert('Criteria could not be saved');
      } else {
        apiGetTeam(data => dispatch(receiveData(data)));
      }
    });

    dispatch({
      type: SAVE_TEAM,
      members: state.members,
    });
  }

  props.router.push('/ip-p2p');
};

export const cancel = props => (dispatch) => {
  if (props.isQM) {
    dispatch({ type: REQUEST_TEAM });
    apiGetTeam(data => dispatch(receiveData(RECEIVE_TEAM, data)));
  } else {
    dispatch({ type: REQUEST_RATINGS });
    apiGetRatings(data => dispatch(receiveData(RECEIVE_RATINGS, data)));
  }

  props.router.push('/ip-p2p');
};


