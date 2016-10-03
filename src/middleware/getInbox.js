// Node imports
import 'isomorphic-fetch';

export const apiEntrypoint = 'http://localhost:3000/p2p/api/inbox';

export const getInbox = callback =>
  fetch(apiEntrypoint)
    .then(response => response.json())
    .then(data => callback(data));
