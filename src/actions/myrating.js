// Middleware
import { default as getMyRating } from '../middleware/getMyRating.mock.js';

import connect from './utils/connect.js';

export const REQUEST_RATING = '/team/REQUEST_MYRATING';
export const RECEIVE_RATING = '/team/RECEIVE_MYRATING';


export const fetchMyRating = connect(
  REQUEST_RATING,
  RECEIVE_RATING,
  getMyRating,
  data => ({
    members: data.members,
    rating: data.rating,
  })
);

