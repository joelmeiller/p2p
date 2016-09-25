import {
  RECEIVE_TEAM,
  REQUEST_TEAM,
  ERROR_RESET_TEAMMEMBER,
} from '../actions/team.js';

const initialState = {
  members: [],
  isFetching: false,
  didInvalidate: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_TEAM:
      return {
        ...state,
        asQM: action.asQM,
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
    case ERROR_RESET_TEAMMEMBER:
      return {
        ...state,
        members: state.members.map(m => (m.id === action.member.id ? action.member : m)),
      };
    default:
      return state;
  }
};

export default reducer;
