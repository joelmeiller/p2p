import fetch from 'isomorphic-fetch';
import { toastr } from 'react-redux-toastr'

import getApiEntrypoint from './getApiEntrypoint.js';

toastr.success('Sucessfully...', '...loaded the Toastr component');

export default (uri, { method, data, error_message } = {}) => {
  return fetch(getApiEntrypoint(uri))
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    toastr.error('Error', '!reponse.ok');
    return Promise.reject(response);
  })
  .catch((error) => {
    // e.g. server down.
    toastr.error('Error', 'catch');
    return Promise.reject(error);
  });
};
