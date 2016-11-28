import fetch from '../utils/fetch.js';

export default callback =>
  fetch('roles/active')
  .then((data) => {
    const roles = data.map(role => ({
      roleId: role.id.toString(),
      title: role.title,
      shortcut: role.shortcut,
    }));
    callback(roles);
  });
