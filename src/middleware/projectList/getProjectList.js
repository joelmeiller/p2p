// Node imports
import fetch from 'isomorphic-fetch';

import getApiEntrypoint from '../utils/getApiEntrypoint.js';

const apiEntrypoint = getApiEntrypoint('projects');


export default callback =>
  fetch(apiEntrypoint)
  .then(response => response.json())
  .then((data) => {
    const projects = data.map(project => ({
      ...project,
      start: new Date(project.start),
      stop: project.stop == null ? null : new Date(project.stop),
    }));
    callback(projects);
  });
