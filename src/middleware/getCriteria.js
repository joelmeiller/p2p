// Node imports
import 'isomorphic-fetch';

export const apiEntrypoint = 'http://localhost:3000/p2p/api/criteria/test';

export const getCriteria = callback =>
  fetch(apiEntrypoint)
    .then(response => response.json())
    .then(data => callback(data));
