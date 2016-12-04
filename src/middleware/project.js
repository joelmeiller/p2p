// Node imports
import moment from 'moment';

import fetch from './utils/fetch.js';

const processReceived = project => ({
  ...project,
  start: new Date(project.start),
  stop: project.stop === null ? null : new Date(project.stop),
});

// TODO: Separate methods and add to subfolder 'projects'
export const getProject = id =>
  fetch(`projects/${id}`, {
    errorMessage: 'Could not get project list', // TODO: i18n
  })
  .then(processReceived);

const processToTransmit = project => ({
  ...project,
  start: moment(project.start).format('YYYY-MM-DD'),
  stop: project.stop === null ? null : moment(project.start).format('YYYY-MM-DD'),
});

export const postProject = project =>
  fetch('projects', {
    errorMessage: 'Could not create new project', // TODO: i18n
    method: 'POST',
    data: processToTransmit(project),
  });

export const updateProjectStatus = project =>
  fetch(`projects/${project.id}/status`, {
    error_message: 'Could not update status of project', // TODO: i18n
    method: 'PUT',
    data: project.status,
  });
