import {
  // RECEIVE_INBOX,
  // REQUEST_INBOX,
  PERFORM_ACTION,
  ADD_ACTION,
} from '../actions/inbox.js';

const initialState = {
  actions: [],
  isFetching: false,
  fetched: false,
};

const reducer = (state = initialState, newAction) => {
  const { type, action } = newAction;

  switch (type) {
    // case REQUEST_INBOX:
    //   return {
    //     ...state,
    //     isFetching: true,
    //   };
    // case RECEIVE_INBOX:
    //   return {
    //     ...state,
    //     ...params,
    //     isFetching: false,
    //   };
    case PERFORM_ACTION:
      return {
        ...state,
        actions: state.actions.filter(a => a.id !== action.id),
        action,
      };
    case ADD_ACTION:
      state.actions.push(action);
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default reducer;
