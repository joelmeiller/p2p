// Middleware
import { default as apiGetRatings } from '../middleware/ratings/getRatings.js';
import { default as apiSaveRating } from '../middleware/ratings/saveRating.js';

// Actions
import { setTitle } from './app.js';
import { addAction, UPDATE_STATUS } from '../actions/inbox.js';

// Middleware
import { FINAL } from '../middleware/students/setMemberStatus.js';

// Utils
import getCriteriaValues from './utils/getCriteriaValues.js';

export const RECEIVE_RATINGS = '/rating/RECEIVE_RATINGS';
export const REQUEST_RATINGS = '/rating/REQUEST_RATINGS';
export const SELECT_RATING = '/rating/SELECT_RATING';
export const UPDATE_COMMENT = '/rating/UPDATE_COMMENT';
export const UPDATE_RATING = '/rating/UPDATE_RATING';
export const SAVE_RATING = '/rating/SAVE_RATING';
export const CANCEL_RATING = '/rating/CANCEL_RATING';
export const ERROR_RESET_UPDATE = '/rating/ERROR_RESET_UPDATE';

const finalizeRatingsAction = (user) => {
  const message = user.isQM ?
    'Deine Bewertung ist komplett, du kannst sie jetzt abschliessen.' :
    'Deine Bewertung ist komplett. Du kannst sie jetzt abschliessen, in dem du sie an deinen Qualtiy Manager (QM) sendest.';

  return {
    id: '300',
    message,
    type: 'important',
    date: new Date(),
    buttonText: user.isQM ? 'Bewertung abschliessen' : 'Bewertung an QM senden',
    params: {
      type: UPDATE_STATUS,
      status: FINAL,
    },
  };
};

const receiveData = data => (dispatch, getState) => {
  const { user } = getState().app;

  dispatch({
    type: RECEIVE_RATINGS,
    ratings: data.ratings,
  });

  if (data.canFinalize) {
    dispatch(addAction(finalizeRatingsAction(user)));
  }
};

const shouldFetchData = (state) => {
  if (!state.rating || state.relaod) {
    return true;
  }
  return !state.rating.isFetching && !state.rating.fetched;
};

export const fetchRatings = () => (dispatch, getState) => {
  if (shouldFetchData(getState())) {
    dispatch({ type: REQUEST_RATINGS });
    apiGetRatings(data => dispatch(receiveData(data)));
  }
};


export const resetPreviousRating = value => ({
  type: ERROR_RESET_UPDATE,
  rating: value,
});

const showSelectedRating = (index, props) => ({
  type: SELECT_RATING,
  onClosePath: props.onClosePath,
  index,
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

    dispatch({
      type: SAVE_RATING,
      ratings: state.ratings.map(rat => (rat.id === rating.id ? rating : rat)),
    });

    apiSaveRating(rating, (data) => {
      dispatch(receiveData(data));
    });
  }

  if (close) {
    props.router.push(props.onClosePath);
  } else {
    dispatch(showSelectedRating(index, props));
    props.router.push(`/ip-p2p/team/rating/${props.ratings[index].slug}`);
  }
};

export const selectRating = (index, props) => (dispatch) => {
  dispatch(saveRating(props, index));
  dispatch(setTitle(`${props.title} ${props.ratings[index].name}`));
};

export const showRating = (rating, props) => (dispatch, getState) => {
  const state = getState().rating;

  const foundRating = state.ratings.find(rat => rat.studentId === rating.studentId);
  const index = foundRating ? state.ratings.indexOf(foundRating) : -1;
  if (index > -1) {
    dispatch(setTitle(`${props.title} ${state.ratings[index].name}`));
    dispatch(showSelectedRating(index, props));
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

export const cancelRating = props => (dispatch) => {
  dispatch({
    type: CANCEL_RATING,
  });
  props.router.push(props.onClosePath);
};


