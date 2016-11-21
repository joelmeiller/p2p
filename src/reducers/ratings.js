import {
  REQUEST_RATINGS,
  RECEIVE_RATINGS,
  SELECT_RATING,
  SAVE_RATINGS,
  UPDATE_COMMENT,
  UPDATE_RATING,
  ERROR_RESET_UPDATE,
} from '../actions/ratings.js';


const initialValues = {
  ratings: [],
};

const initialState = {
  selectedIndex: 0,
  values: initialValues,
  ratings: [],
};

const reducer = (state = initialState, action) => {
  const { type, ...params } = action;
  const newState = { ...state };
  newState.resetRating = undefined;

  const values = { ...state.values };

  switch (type) {
    case REQUEST_RATINGS:
      return {
        ...state,
        ...params,
        isFetching: true,
      };
    case RECEIVE_RATINGS:
      return {
        ...state,
        ...params,
        isFetching: false,
        fetched: true,
      };
    case SAVE_RATINGS:
      return {
        ...state,
        ...params,
      };
    case SELECT_RATING:
      values.ratings = [];
      return {
        ...newState,
        selectedIndex: action.index,
        onClosePath: action.onClosePath,
        readonly: action.readonly,
        title: action.title,
        values,
      };
    case UPDATE_COMMENT:
      values.comment = action.comment;

      return {
        ...newState,
        values,
        ratingUpdated: true,
      };
    case UPDATE_RATING:
      if (values.ratings.find(r => r.id === action.id)) {
        values.ratings = values.ratings.map(rating => (
          rating.id === action.id ? { id: action.id, rating: action.rating } : rating)
        );
      } else {
        values.ratings.push({ id: action.id, rating: action.rating });
      }

      return {
        ...newState,
        values,
        ratingUpdated: true,
      };
    case ERROR_RESET_UPDATE:
      return {
        ...newState,
        resetRating: action.rating,
      };
    default:
      return newState;
  }
};

export default reducer;
