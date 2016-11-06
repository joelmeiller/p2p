// Node imports
import fetch from 'isomorphic-fetch';


const apiEntrypoint = 'http://localhost:8080/api/roles/active';

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
