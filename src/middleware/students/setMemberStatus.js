// Node imports
import fetch from 'isomorphic-fetch';

import getApiEntrypoint from '../utils/getApiEntrypoint.js';

const apiEntrypoint = getApiEntrypoint('project/members/status');

// Student Update Status
export const OPEN = 'OPEN';
export const FINAL = 'OPEN';
export const ACCEPTED = 'ACCEPTED';


export default (status) => {
  fetch(apiEntrypoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(status),
  })
  .then((response) => {
    if (response.status !== 200) {
      console.log(`Error from Server: ${response.status}`);
    }
  });
};
