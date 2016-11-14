import {
  ADD_MEMBER,
  RECEIVE_TEAM,
  RECEIVE_RATINGS,
  REMOVE_MEMBER,
  REQUEST_TEAM,
  REQUEST_RATINGS,
  UPDATE_TEAM,
  SAVE_TEAM,
} from '../actions/team.js';

const initialState = {
  members: [],
  ratings: [],
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
    case REQUEST_RATINGS:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_TEAM:
    case RECEIVE_RATINGS:
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
