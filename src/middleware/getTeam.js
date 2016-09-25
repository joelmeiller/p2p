// Node imports
import 'isomorphic-fetch';

export const apiEntrypoint = 'http://localhost:3000/p2p/api/team/test';

export const getTeam = callback =>
  fetch(apiEntrypoint)
    .then(response => response.json())
    .then(data => callback(data));
