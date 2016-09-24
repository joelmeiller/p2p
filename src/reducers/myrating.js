import {
  RECEIVE_RATING,
  REQUEST_RATING,
} from '../actions/myrating.js';

const initialState = {
  members: [],
  isFetching: false,
  didInvalidate: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_RATING:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false,
      };
    case RECEIVE_RATING:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        members: action.members,
        lastUpdated: action.receivedAt,
      };
    default:
      return state;
  }
};

export default reducer;
