import {
  ADD_MEMBER,
  RECEIVE_TEAM,
  REMOVE_MEMBER,
  REQUEST_TEAM,
  UPDATE_TEAM,
  SAVE_TEAM,
} from '../actions/team.js';

const initialState = {
  members: [],
  ratings: [],
  newMemberValues: {},
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
        isFetching: true,
      };
    case RECEIVE_TEAM:
      return {
        ...state,
        ...params,
        isFetching: false,
      };
    case REMOVE_MEMBER:
    case SAVE_TEAM:
    case ADD_MEMBER:
    case UPDATE_TEAM:
      return {
        ...state,
        ...params,
      };
    default:
      return state;
  }
};

export default reducer;
