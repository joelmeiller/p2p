// Node imports
import mock from 'fetch-mock';

// import { saveCriteria as origin } from './saveCriteria.js';

export const response = {
  status: 'OK',
  message: 'Joel Meiller updated',
};


export default (values, callback) => {
  // Patch the fetch() global to always return the same value for GET
  // requests to all URLs.
  mock.get('http://localhost:3000/p2p/api/team/categories/save', response);

  // origin(member, callback);

  callback(null, response);

  // Unpatch.
  mock.restore();
};
