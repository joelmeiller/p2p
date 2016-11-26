// Node imports
import fetch from 'isomorphic-fetch';
import moment from 'moment';

import getApiEntrypoint from './utils/getApiEntrypoint.js';


export const getProject = (id, callback) =>
  fetch(getApiEntrypoint(`projects/${id}`))
  .then(response => response.json())
  .then((data) => {
    const projectList = {
      ...data,
      start: new Date(data.start),
      stop: data.stop === null ? null : new Date(data.stop),
    };
    callback(projectList);
  });


const rarifyProject = project => ({
  ...project,
  start: moment(project.start).format('YYYY-MM-DD'),
  stop: project.stop === null ? null : moment(project.start).format('YYYY-MM-DD'),
  members: [{
    student: {
      email: project.qmName,
    },
  }],
});

const params = data => ({
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(rarifyProject(data)),
});

export const putProject = (project, callback) =>
  fetch(getApiEntrypoint(`projects/${project.id}`), {
    ...params(project),
    method: 'PUT',
  })
  .then(callback);


export const postProject = (project, callback) =>
  fetch(getApiEntrypoint('projects'), {
    ...params(project),
    method: 'POST',
  })
  .then(callback);
