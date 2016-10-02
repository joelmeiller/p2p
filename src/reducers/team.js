import {
  ADD_MEMBER,
  ERROR_RESET_TEAMMEMBER,
  RECEIVE_TEAM,
  REMOVE_MEMBER,
  REQUEST_TEAM,
  SET_NEW_MEMBER_VALUE,
  UPDATE_TEAM,
} from '../actions/team.js';

const initialState = {
  members: [],
  newMemberValues: {},
  canAdd: false,
  roles: [],
  isFetching: false,
  fetched: false,
};

const reducer = (state = initialState, action) => {
  const { type, ...params } = action;

  switch (type) {
    case REQUEST_TEAM:
      return {
        ...state,
        addedMember: undefined,
        isFetching: true,
      };
    case RECEIVE_TEAM:
      return {
        ...state,
        ...params,
        addedMember: undefined,
        isFetching: false,
      };
    case UPDATE_TEAM:
    case REMOVE_MEMBER:
    case SET_NEW_MEMBER_VALUE:
      return {
        ...state,
        ...params,
        addedMember: undefined,
      };
    case ADD_MEMBER:
      return {
        ...state,
        ...params,
        addedMember: action.member,
      };
    case ERROR_RESET_TEAMMEMBER:
      return {
        ...state,
        addedMember: undefined,
        members: state.members.map(m => (m.id === action.member.id ? action.member : m)),
      };
    default:
      return state;
  }
};

export default reducer;
