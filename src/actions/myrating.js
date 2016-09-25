// Middleware
import { default as getMyRating } from '../middleware/getMyRating.mock.js';

export const REQUEST_RATING = '/team/REQUEST_MYRATING';
export const RECEIVE_RATING = '/team/RECEIVE_MYRATING';


const requestData = () => ({
  type: REQUEST_RATING,
});

const receiveData = data => ({
  type: RECEIVE_RATING,
  rating: data.rating,
  members: data.members,
});

const fetchData = () => (dispatch) => {
  dispatch(requestData());
  getMyRating((data) => {
    dispatch(receiveData(data));
  });
};

const shouldFetchRating = (state) => {
  if (!state.team) {
    return true;
  }
  return !state.team.isFetching;
};

export const fetchMyRating = () => (dispatch, state) => {
  if (shouldFetchRating(state)) {
    dispatch(fetchData());
  }
};
