// Node imports
import fetch from 'isomorphic-fetch';

import getApiEntrypoint from '../utils/getApiEntrypoint.js';

const apiEntrypoint = getApiEntrypoint('projects/close');


export default (projectId, callback) => {
  fetch(apiEntrypoint, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: projectId }),
  })
  .then(response => response.json())
  .then(data => callback(data));
};
