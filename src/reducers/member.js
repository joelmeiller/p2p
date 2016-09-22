import {
  SELECT_MEMBER,
} from '../actions/member.js';

const initialState = {
  selectedIndex: 0,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_MEMBER:
      return {
        ...state,
        selectedIndex: action.index,
      };
    default:
      return state;
  }
};

export default reducer;
