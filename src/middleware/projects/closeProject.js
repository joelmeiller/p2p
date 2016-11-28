// Node imports
import fetch from '../utils/fetch.js';

export default (projectId, callback) => {
  fetch('projects/close', {
    method: 'PUT',
    data: { id: projectId },
  })
  .then(callback);
};
