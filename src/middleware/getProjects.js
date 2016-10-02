// Node imports
import 'isomorphic-fetch';

export const apiEntrypoint = 'http://localhost:3000/p2p/api/projects';

export const getProjects = callback =>
  fetch(apiEntrypoint)
    .then(response => response.json())
    .then(data => callback(data));
