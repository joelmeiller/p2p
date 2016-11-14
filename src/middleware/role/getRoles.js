// Node imports
import fetch from 'isomorphic-fetch';

import getApiEntrypoint from '../utils/getApiEntrypoint.js';

const apiEntrypoint = getApiEntrypoint('roles/active');


export default callback =>
  fetch(apiEntrypoint)
  .then(response => response.json())
  .then((data) => {
    const roles = data.map(role => ({
      roleId: role.id.toString(),
      title: role.title,
      shortcut: role.shortcut,
    }));
    callback(roles);
  });
