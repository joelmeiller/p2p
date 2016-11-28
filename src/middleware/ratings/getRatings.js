import fetch from '../utils/fetch.js';
import mapRating from '../utils/mapRating.js';

export default callback =>
  fetch('project/member/ratings')
  .then(data => callback({
    ...data,
    ratings: data.ratings.map(rating => mapRating(rating)),
  }));
