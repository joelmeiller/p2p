import {
  SELECT_MEMBER,
  UPDATE_COMMENT,
  UPDATE_RATING,
} from '../actions/member.js';

const initialValues = {
  ratings: [],
};

const initialState = {
  selectedIndex: 0,
  values: initialValues,
};

const reducer = (state = initialState, action) => {
  const values = { ...state.values };

  switch (action.type) {
    case SELECT_MEMBER:
      return {
        ...state,
        selectedIndex: action.index,
      };
    case UPDATE_COMMENT:
      values.comment = action.comment;
      return {
        ...state,
        values,
        memberUpdated: true,
      };
    case UPDATE_RATING:
      if (values.ratings.find(r => r.id === action.id)) {
        values.ratings = values.ratings.map(rating => (
          rating.id === action.id ? { id: action.id, stars: action.stars } : rating)
        );
      } else {
        values.ratings.push({ id: action.id, stars: action.stars });
      }
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
