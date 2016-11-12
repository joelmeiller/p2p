// Middleware
import { default as apiSaveRating } from '../middleware/ratings/saveRating.js';

// Actions
import { setTitle } from './app.js';
import { updateMemberRating } from './team.js';

// Utils
import getCriteriaValues from './utils/getCriteriaValues.js';
import getMemberRatings from './utils/getMemberRatings.js';


export const INITIALIZE = '/rating/INITIALIZE';
export const SELECT_RATING = '/rating/SELECT_RATING';
export const UPDATE_COMMENT = '/rating/UPDATE_COMMENT';
export const UPDATE_RATING = '/rating/UPDATE_RATING';
export const CANCEL_RATING = '/rating/CANCEL_RATING';
export const ERROR_RESET_UPDATE = '/rating/ERROR_RESET_UPDATE';


export const resetPreviousRating = value => ({
  type: ERROR_RESET_UPDATE,
  rating: value,
});

const showSelectedRating = (index, props, readonly) => ({
  type: SELECT_RATING,
  onClosePath: props.onClosePath,
  index,
  readonly,
  title: props.title,
});

const saveRating = (props, index, close) => (dispatch, getState) => {
  const state = getState().rating;

  if (state.ratingUpdated && state.values) {
    const rating = state.ratings[state.selectedIndex];

    if (state.values.rating) {
      rating.categories = getCriteriaValues(rating, state.values);
    }
    rating.comment = state.values.comment || rating.comment;

    dispatch(updateMemberRating({
      studentId: props.studentId,
      ratings: state.ratings.map(rat => (rat.id === rating.id ?
        rating : rat)),
    }));

    apiSaveRating(rating, (res) => {
      if (res.status !== 200) {
        dispatch(resetPreviousRating(props.rating));
        dispatch(updateMemberRating(props.rating));
      }
    });
  }

  if (close) {
    props.router.push(props.onClosePath);
  } else {
    dispatch(showSelectedRating(index, props, true));
    props.router.push(`/ip-p2p/team/rating/${props.ratings[index].slug}`);
  }
};

export const selectRating = (index, props) => (dispatch) => {
  dispatch(saveRating(props, index));
  dispatch(setTitle(`${props.title} ${props.ratings[index].name}`));
};

export const showRating = (rating, props, readonly) => (dispatch, getState) => {
  const state = getState().rating;

  const foundRating = state.ratings.find(rat => rat.studentId === rating.studentId);
  const index = foundRating ? state.ratings.indexOf(foundRating) : -1;
  if (index > -1) {
    dispatch(setTitle(`${props.title} ${state.ratings[index].name}`));
    dispatch(showSelectedRating(index, props, readonly));
    props.router.push(`/ip-p2p/team/rating/${state.ratings[index].slug}`);
  } else {
    console.log('Rating not found');
  }
};

export const saveRatingAndClose = props => (dispatch) => {
  dispatch(saveRating(props, 0, true));
};

export const updateComment = value => ({
  type: UPDATE_COMMENT,
  comment: value,
});

export const updateRating = (value, id) => ({
  type: UPDATE_RATING,
  id,
  rating: value,
});

export const initializeRatings = ratings => ({
  type: INITIALIZE,
  ratings,
});

export const initializeMembers = members => ({
  type: INITIALIZE,
  ratings: getMemberRatings(members),
});

export const cancelRating = props => (dispatch) => {
  dispatch({
    type: CANCEL_RATING,
  });
  props.router.push(props.onClosePath);
};
