import fetch from '../utils/fetch.js';

// Student Update Status
export const OPEN = 'OPEN';
export const FINAL = 'FINAL';
export const ACCEPTED = 'ACCEPTED';


export default (status, callback) => {
  fetch('project/members/status', {
    method: 'POST',
    data: status,
  })
  .then(callback);
};
