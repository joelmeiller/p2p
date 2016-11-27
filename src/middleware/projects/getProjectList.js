import fetch from '../utils/fetch.js';

export default callback =>
  fetch('projects')
  .then((data) => {
    const projects = data.map(project => ({
      ...project,
      start: new Date(project.start),
      stop: project.stop == null ? null : new Date(project.stop),
    }));
    callback(projects);
  });
