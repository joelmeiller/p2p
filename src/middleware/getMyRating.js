// Node imports
import fetch from './utils/fetch.js';

export const getMyRating = callback =>
  fetch('myrating/test')
    .then(callback);
