// Node imports
import fetch from 'isomorphic-fetch';

import getApiEntrypoint from '../utils/getApiEntrypoint.js';


export default (id, callback) =>
  fetch(getApiEntrypoint(`projects/${id}`))
  .then(response => response.json())
  .then((data) => {
    const projectList = data;
    callback(projectList);
  });
