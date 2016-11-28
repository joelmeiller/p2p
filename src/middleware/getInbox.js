import fetch from './utils/fetch.js';

export const getInbox = callback =>
  fetch('inbox')
    .then(callback);
