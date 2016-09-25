// Middleware
import { getMyRating } from '../middleware/getMyRating.mock.js';

export const REQUEST_RATING = '/team/REQUEST_RATING';
export const RECEIVE_RATING = '/team/RECEIVE_RATING';
export const INVALIDATE_PROJECT = '/team/INVALIDATE_PROJECT';


export const invalidateProject = project => ({
  type: INVALIDATE_PROJECT,
  project,
});

const requestTeam = project => ({
  type: REQUEST_RATING,
  project,
});

const receiveRating = (project, data) => ({
  type: RECEIVE_RATING,
  project,
  rating: data.rating,
  members: data.members,
});

const fetchTeam = project => (dispatch) => {
  dispatch(requestTeam(project));
  getMyRating(project, (data) => {
    dispatch(receiveRating(project, data));
  });
};

const shouldFetchRating = (state) => {
  if (!state.team) {
    return true;
  }
  return !state.team.isFetching;
};

export const fetchMyRatingIfNeeded = project => (dispatch, state) => {
  if (shouldFetchRating(state)) {
    dispatch(fetchTeam(project));
  }
};
