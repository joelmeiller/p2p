import {
  SELECT_MEMBER,
  UPDATE_COMMENT,
} from '../actions/member.js';

const initialState = {
  selectedIndex: 0,
  values: {},
}

const reducer = (state = initialState, action) => {
  const values = { ...state.values };
  switch (action.type) {
    case SELECT_MEMBER:
      return {
        ...state,
        selectedIndex: action.index,
      };
    case UPDATE_COMMENT:
      console.log('update comment', action.comment);
      values.comment = action.comment;
      return {
        ...state,
        values,
        memberUpdated: true,
      };
    default:
      return state;
  }
};

export default reducer;
