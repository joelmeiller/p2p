// Middleware
import { default as getMyRating } from '../middleware/getMyRating.mock.js';

export const REQUEST_RATING = '/team/REQUEST_MYRATING';
export const RECEIVE_RATING = '/team/RECEIVE_MYRATING';


const requestData = () => ({
  type: REQUEST_RATING,
});

const receiveData = data => ({
  type: RECEIVE_RATING,
  members: data.members,
  rating: data.rating,
});

const shouldFetchData = (state) => {
  if (!state.myrating || state.relaod) {
    return true;
  }
  return !state.myrating.isFetching && !state.myrating.fetched;
};


export const fetchMyRating = () => (dispatch, getState) => {
  if (shouldFetchData(getState())) {
    dispatch(requestData());

    getMyRating((data) => {
      dispatch(receiveData(data));
    });
  }
};
