import {
  RECEIVE_TEAM,
  REQUEST_TEAM,
} from '../actions/team.js';

const initialState = {
  members: [],
  isFetching: false,
  didInvalidate: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_TEAM:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
      });
    case RECEIVE_TEAM:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        members: action.members,
        lastUpdated: action.receivedAt,
      });
    default:
      return state;
  }
};

export default reducer;
