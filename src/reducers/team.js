import {
  RECEIVE_TEAM,
  REQUEST_TEAM,
  SELECT_MEMBER,
} from '../actions/team.js';

const initialState = {
  members: [],
  isFetching: false,
  didInvalidate: false,
  selectedIndex: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_TEAM:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false,
      };
    case RECEIVE_TEAM:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        members: action.members,
        lastUpdated: action.receivedAt,
      };
    case SELECT_MEMBER:
      const index = state.members.indexOf(action.member);
      return {
        ...state,
        selectedIndex: (index > -1) ? index : 0,
      };
    default:
      return state;
  }
};

export default reducer;
