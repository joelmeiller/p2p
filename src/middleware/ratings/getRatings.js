// Node imports
import fetch from 'isomorphic-fetch';

import getApiEntrypoint from '../utils/getApiEntrypoint.js';
import mapRating from '../utils/mapRating.js';

const apiEntrypoint = getApiEntrypoint('project/member/ratings');


export default callback =>
  fetch(apiEntrypoint)
  .then(response => response.json())
  .then(data => callback(data.ratings.map(rating => mapRating(rating))));
