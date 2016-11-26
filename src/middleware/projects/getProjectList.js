// Node imports
import fetch from 'isomorphic-fetch';

import getApiEntrypoint from '../utils/getApiEntrypoint.js';

const apiEntrypoint = getApiEntrypoint('projects');


export default callback =>
  fetch(apiEntrypoint)
  .then(response => response.json())
  .then((data) => {
    const project = data;
    callback(project);
  });
