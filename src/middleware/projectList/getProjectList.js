// Node imports
import fetch from 'isomorphic-fetch';

import getApiEntrypoint from '../utils/getApiEntrypoint.js';

const apiEntrypoint = getApiEntrypoint('projectList');


export default callback =>
  fetch(apiEntrypoint)
  .then(response => response.json())
  .then((data) => {
    const projectList = data;
    callback(projectList);
  });
