import {
  RECEIVE_ROLE,
  REQUEST_ROLE,
} from '../actions/roles.js';

const initialState = {
  roles: [],
  isFetching: false,
  fetched: false,
};

const reducer = (state = initialState, action) => {
  const { type, ...params } = action;
  switch (type) {
    case REQUEST_ROLE:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_ROLE:
      return {
        ...state,
        ...params,
        isFetching: false,
      };
    default:
      return state;
  }
};

export default reducer;
